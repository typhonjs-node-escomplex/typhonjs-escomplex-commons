import AbstractReport   from './AbstractReport';
import AggregateReport  from './AggregateReport';
import AnalyzeError     from '../../analyze/AnalyzeError';
import ClassReport      from './ClassReport';
import MethodAverage    from './averages/MethodAverage';
import MethodReport     from './MethodReport';

import MathUtil         from  '../../utils/MathUtil';
import TransformFormat  from  '../../transform/TransformFormat';

/**
 * Provides the module report object which stores data pertaining to a single file / module being processed.
 *
 * All ES Module classes are stored in the `classes` member variable as ClassReports. Methods that are not part of a
 * class are stored as MethodReports in the `methods` member variable.
 *
 * Various helper methods found in ModuleReport and AbstractReport help increment associated data during collection.
 */
export default class ModuleReport extends AbstractReport
{
   /**
    * Initializes the report.
    *
    * @param {number}   lineStart - Start line of file / module.
    *
    * @param {number}   lineEnd - End line of file / module.
    *
    * @param {object}   settings - An object hash of the settings used in generating this report via ESComplexModule.
    */
   constructor(lineStart = 0, lineEnd = 0, settings = {})
   {
      super(new AggregateReport(lineStart, lineEnd));

      /**
       * Stores the settings used to generate the module report.
       * @type {object}
       */
      this.settings = typeof settings === 'object' ? settings : {};

      /**
       * Stores all ClassReport data for the module.
       * @type {Array<ClassReport>}
       */
      this.classes = [];

      /**
       * Stores all parsed dependencies.
       * @type {Array}
       */
      this.dependencies = [];

      /**
       * Stores any analysis errors.
       * @type {Array}
       */
      this.errors = [];

      /**
       * Stores the file path of the module / file. The file path is only defined as supplied when processing projects.
       * @type {string}
       */
      this.filePath = void 0;

      /**
       * Stores the end line for the module / file.
       * @type {number}
       */
      this.lineEnd = lineEnd;

      /**
       * Stores the start line for the module / file.
       * @type {number}
       */
      this.lineStart = lineStart;

      /**
       * Measures the average method maintainability index for the module / file.
       * @type {number}
       */
      this.maintainability = 0;

      /**
       * Stores all module MethodReport data found outside of any ES6 classes.
       * @type {Array<MethodReport>}
       */
      this.methods = [];

      /**
       * Stores the average method metric data.
       * @type {MethodAverage}
       */
      this.methodAverage = new MethodAverage();

      /**
       * Stores the current class report scope stack.
       * @type {Array<ClassReport>}
       */
      this._scopeStackClass = [];

      /**
       * Stores the current method report scope stack.
       * @type {Array<MethodReport>}
       */
      this._scopeStackMethod = [];

      /**
       * Stores the active source path of the module / file. This path is respective of how the file is referenced in
       * the source code itself. `srcPath` is only defined as supplied when processing projects.
       * @type {string}
       */
      this.srcPath = void 0;

      /**
       * Stores the active source path alias of the module / file. This path is respective of how the file is
       * referenced in the source code itself when aliased including NPM and JSPM modules which provide a `main` entry.
       * `srcPathAlias` is only defined as supplied when processing projects.
       * @type {string}
       */
      this.srcPathAlias = void 0;
   }

   /**
    * Potentially adds given dependencies for tracking.
    *
    * @param {object|Array}   dependencies - Dependencies to add.
    */
   addDependencies(dependencies)
   {
      if (typeof dependencies === 'object' || Array.isArray(dependencies))
      {
         this.dependencies = this.dependencies.concat(dependencies);
      }
   }

   /**
    * Clears all errors stored in the module report and by default any class reports and module methods.
    *
    * @param {boolean}  clearChildren - (Optional) If false then class and module method errors are not cleared;
    *                                   default (true).
    */
   clearErrors(clearChildren = true)
   {
      this.errors = [];

      if (clearChildren)
      {
         this.classes.forEach((report) => { report.clearErrors(); });
         this.methods.forEach((report) => { report.clearErrors(); });
      }
   }

   /**
    * Creates a report scope when a class or method is entered.
    *
    * @param {string}   type - Type of report to create.
    * @param {string}   name - Name of the class or method.
    * @param {number}   lineStart - Start line of method.
    * @param {number}   lineEnd - End line of method.
    * @param {number}   params - Number of parameters for method.
    *
    * @return {object}
    */
   createScope(type, name = '', lineStart = 0, lineEnd = 0, params = 0)
   {
      let report;

      switch (type)
      {
         case 'class':
            report = new ClassReport(name, lineStart, lineEnd);
            this.classes.push(report);
            this._scopeStackClass.push(report);
            break;

         case 'method':
         {
            report = new MethodReport(name, lineStart, lineEnd, params);

            // Increment aggregate method report params.
            this.incrementParams(params);

            // If an existing class report / scope exists also push the method to the class report.
            const classReport = this.getCurrentClassReport();

            if (classReport)
            {
               classReport.incrementParams(params);
               classReport.methods.push(report);
            }
            else
            {
               // Add this report to the module methods as there is no current class report.
               this.methods.push(report);
            }

            this._scopeStackMethod.push(report);

            break;
         }

         default:
            throw new Error(`createScope error: Unknown scope type (${type}).`);
      }

      return report;
   }

   /**
    * Cleans up any house keeping member variables.
    *
    * @returns {ModuleReport}
    */
   finalize()
   {
      delete this._scopeStackClass;
      delete this._scopeStackMethod;

      return MathUtil.toFixedTraverse(this);
   }

   /**
    * Returns the current class report.
    *
    * @returns {ClassReport}
    */
   getCurrentClassReport()
   {
      return this._scopeStackClass.length > 0 ? this._scopeStackClass[this._scopeStackClass.length - 1] : void 0;
   }

   /**
    * Returns the current method report.
    *
    * @returns {MethodReport}
    */
   getCurrentMethodReport()
   {
      return this._scopeStackMethod.length > 0 ? this._scopeStackMethod[this._scopeStackMethod.length - 1] : void 0;
   }

   /**
    * Gets all errors stored in the module report and by default any module methods and class reports.
    *
    * @param {boolean}  includeChildren - (Optional) If false then class and module method errors are not included;
    *                                     default (true).
    *
    * @returns {Array<AnalyzeError>}
    */
   getErrors(includeChildren = true)
   {
      const errors = [].concat(...this.errors);

      if (includeChildren)
      {
         this.methods.forEach((report) => { errors.push(...report.getErrors()); });
         this.classes.forEach((report) => { errors.push(...report.getErrors()); });
      }

      return errors;
   }

   /**
    * Returns the supported format file extension types.
    *
    * @returns {string[]}
    */
   static getFormatFileExtensions()
   {
      return TransformFormat.getFileExtensions();
   }

   /**
    * Returns the supported format names.
    *
    * @returns {string[]}
    */
   static getFormatNames()
   {
      return TransformFormat.getNames();
   }

   /**
    * Returns the supported format types.
    *
    * @returns {string[]}
    */
   static getFormatTypes()
   {
      return TransformFormat.getTypes();
   }

   /**
    * Returns the setting indexed by the given key.
    *
    * @param {string}   key - A key used to store the setting parameter.
    * @param {*}        defaultValue - A default value to return if no setting for the given key is currently stored.
    *
    * @returns {*}
    */
   getSetting(key, defaultValue = undefined)
   {
      /* istanbul ignore if */
      if (typeof key !== 'string' || key === '')
      {
         throw new TypeError(`getSetting error: 'key' is not a 'string' or is empty.`);
      }

      return typeof this.settings === 'object' && typeof this.settings[key] !== 'undefined' ? this.settings[key] :
       defaultValue;
   }

   /**
    * Increments the Halstead `metric` for the given `identifier` for the ModuleReport and any current class or method
    * report being tracked.
    *
    * @param {string}   metric - A Halstead metric name.
    * @param {string}   identifier - A Halstead identifier name.
    */
   halsteadItemEncountered(metric, identifier)
   {
      const currentClassReport = this.getCurrentClassReport();
      const currentMethodReport = this.getCurrentMethodReport();

      this.incrementHalsteadItems(metric, identifier);

      if (currentClassReport) { currentClassReport.incrementHalsteadItems(metric, identifier); }

      if (currentMethodReport) { currentMethodReport.incrementHalsteadItems(metric, identifier); }
   }

   /**
    * Increments the cyclomatic metric for the ModuleReport and any current class or method report being tracked.
    *
    * @param {number}   amount - Amount to increment.
    */
   incrementCyclomatic(amount)
   {
      const currentClassReport = this.getCurrentClassReport();
      const currentMethodReport = this.getCurrentMethodReport();

      this.aggregate.cyclomatic += amount;

      if (currentClassReport) { currentClassReport.aggregate.cyclomatic += amount; }
      if (currentMethodReport) { currentMethodReport.cyclomatic += amount; }
   }

   /**
    * Increments the logical SLOC (source lines of code) metric for the ModuleReport and any current class or method
    * report being tracked.
    *
    * @param {number}   amount - Amount to increment.
    */
   incrementLogicalSloc(amount)
   {
      const currentClassReport = this.getCurrentClassReport();
      const currentMethodReport = this.getCurrentMethodReport();

      this.aggregate.sloc.logical += amount;

      if (currentClassReport) { currentClassReport.aggregate.sloc.logical += amount; }
      if (currentMethodReport) { currentMethodReport.sloc.logical += amount; }
   }

   /**
    * Deserializes a JSON object representing a ModuleReport.
    *
    * @param {object}   object - A JSON object of a ModuleReport that was previously serialized.
    *
    * @returns {ModuleReport}
    */
   static parse(object)
   {
      /* istanbul ignore if */
      if (typeof object !== 'object') { throw new TypeError(`parse error: 'object' is not an 'object'.`); }

      const report = Object.assign(new ModuleReport(), object);

      if (report.classes.length > 0)
      {
         report.classes = report.classes.map((classReport) => { return ClassReport.parse(classReport); });
      }

      if (report.errors.length > 0)
      {
         report.errors = report.errors.map((error) => { return Object.assign(new AnalyzeError(), error); });
      }

      if (report.methods.length > 0)
      {
         report.methods = report.methods.map((methodReport) => { return MethodReport.parse(methodReport); });
      }

      return report;
   }

   /**
    * Pops a report scope.
    *
    * @param {string} type - The report scope `class` or `method` to pop off the given stack.
    * @returns {*}
    */
   popScope(type)
   {
      switch (type)
      {
         case 'class':
            this._scopeStackClass.pop();
            return this.getCurrentClassReport();

         case 'method':
            this._scopeStackMethod.pop();
            return this.getCurrentMethodReport();

         default:
            throw new Error(`popScope error: Unknown scope type (${type}).`);
      }
   }

   /**
    * Processes all TraitHalstead identifier data.
    *
    * @param {string}         metric - The Halstead metric being processed.
    * @param {Array<string>}  identifiers - An array of Halstead identifiers.
    */
   processHalsteadItems(metric, identifiers)
   {
      identifiers.forEach((identifier) =>
      {
         this.halsteadItemEncountered(metric, identifier);
      });
   }

   /**
    * Sets the setting indexed by the given key and returns true if successful.
    *
    * @param {string}   key - A key used to store the setting parameter.
    * @param {*}        value - A value to set to `this.settings[key]`.
    *
    * @returns {boolean}
    */
   setSetting(key, value)
   {
      /* istanbul ignore if */
      if (typeof key !== 'string' || key === '')
      {
         throw new TypeError(`setSetting error: 'key' is not a 'string' or is empty.`);
      }

      if (this.settings === 'object')
      {
         this.settings[key] = value;
         return true;
      }

      return false;
   }

   /**
    * Formats this ModuleReport given the type.
    *
    * @param {string}   name - The name of formatter to use.
    *
    * @param {object}   options - (Optional) One or more optional parameters to pass to the formatter.
    *
    * @returns {string}
    */
   toFormat(name, options = undefined)
   {
      return TransformFormat.format(this, name, options);
   }
}
