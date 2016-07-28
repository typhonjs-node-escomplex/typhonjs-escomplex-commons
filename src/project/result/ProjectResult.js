import TransformFormat  from  '../../transform/TransformFormat';

import ModuleAverage    from  '../../module/report/averages/ModuleAverage';
import ModuleReport     from  '../../module/report/ModuleReport';
import MathUtil         from  '../../utils/MathUtil';
import StringUtil       from  '../../utils/StringUtil';

/**
 * Provides the default project report object which stores data pertaining to all modules / files contained.
 *
 * All module / file reports are stored in the `reports` member variable as ModuleReports.
 *
 * Various helper methods found in ModuleReport and AbstractReport help increment associated data during collection.
 */
export default class ProjectResult
{
   /**
    * Initializes ProjectReport with default values.
    *
    * @param {Array<ModuleReport>}  moduleReports - An array of ModuleReports for each module / file processed.
    *
    * @param {object}               settings - An object hash of the settings used in generating this report via
    *                                          ESComplexProject.
    */
   constructor(moduleReports = void 0, settings = { serializeReports: true })
   {
      /**
       * Stores the settings used to generate the project report.
       * @type {object}
       */
      this.settings = typeof settings === 'object' ? settings : { serializeReports: true };

      /**
       * Stores a compacted form of the adjacency matrix. Each row index corresponds to the same report index.
       * Each row entry corresponds to a report index. These relationships dictate the dependencies between all
       * report ModuleReports given the source paths.
       *
       * @type {Array<Array<number>>}
       */
      this.adjacencyList = void 0;

      /**
       * Measures the average percentage of modules affected when one module / file in the project is changed.
       * Lower is better.
       * @type {number}
       */
      this.changeCost = 0;

      /**
       * Measures the percentage of modules that are widely depended on which also depend on other modules.
       * Lower is better.
       * @type {number}
       */
      this.coreSize = 0;

      /**
       * Stores any analysis errors.
       * @type {Array}
       */
      this.errors = [];

      /**
       * Measures the percentage of all possible internal dependencies that are actually realized in the project.
       * Lower is better.
       * @type {number}
       */
      this.firstOrderDensity = 0;

      /**
       * Stores the average module metric data.
       * @type {ModuleAverage}
       */
      this.moduleAverage = new ModuleAverage();

      /**
       * Stores all ModuleReport data for the project sorted by the module / files `srcPath`.
       * @type {Array<ModuleReport>}
       */
      this.reports = Array.isArray(moduleReports) ?
       moduleReports.sort((lhs, rhs) => { return StringUtil.compare(lhs.srcPath, rhs.srcPath); }) : [];

      /**
       * Stores a compacted form of the visibility matrix. Each row index corresponds to the same report index.
       * Each row entry corresponds to a report index. These relationships dictate the reverse visibility between all
       * report ModuleReports which may indirectly impact the given module / file.
       *
       * @type {Array<Array<number>>}
       */
      this.visibilityList = void 0;
   }

   /**
    * Clears all errors stored in the project report and by default any module reports.
    *
    * @param {boolean}  clearChildren - (Optional) If false then class and module method errors are not cleared;
    *                                   default (true).
    */
   clearErrors(clearChildren = true)
   {
      this.errors = [];

      if (clearChildren)
      {
         this.reports.forEach((report) => { report.clearErrors(); });
      }
   }

   /**
    * Finalizes the ProjectResult. If `settings.serializeReports` is false output just `filePath`, `srcPath` &
    * `srcPathAlias` entries of reports.
    *
    * @param {object}      options - (Optional) Allows overriding of ModuleReport serialization.
    * @property {boolean}  serializeReports - Allows overriding of ModuleReport serialization; default: true.
    * @property {boolean}  serializeReportAverages - If serializeReports is false and serializeReportAverages is true
    *                                                then module averages will also be added to a reduced project
    *                                                result; default: false.
    *
    * @returns {ProjectResult}
    */
   finalize(options = {})
   {
      if (typeof options !== 'object') { throw new TypeError(`finalize error: 'options' is not an 'object'.`); }

      let serializeReports = this.getSetting('serializeReports', true);
      let serializeReportAverages = this.getSetting('serializeReportAverages', false);

      // Allow an override opportunity.
      if (typeof options.serializeReports === 'boolean') { serializeReports = options.serializeReports; }
      if (typeof options.serializeReportAverages === 'boolean')
      {
         serializeReportAverages = options.serializeReportAverages;
      }

      if (serializeReports)
      {
         this.reports.forEach((report) => { report.finalize(); });
      }
      else
      {
         this.reports = this.reports.map((report) =>
         {
            const modReport = { filePath: report.filePath, srcPath: report.srcPath, srcPathAlias: report.srcPathAlias };

            // Potentially add module averages
            if (serializeReportAverages)
            {
               modReport.maintainability = report.maintainability;
               modReport.methodAverage = report.methodAverage;
            }

            return modReport;
         });
      }

      return MathUtil.toFixedTraverse(this);
   }

   /**
    * Gets all errors stored in the project report and by default any module reports.
    *
    * @param {boolean}  includeChildren - (Optional) If false then module errors are not included; default (true).                                     default (true).
    *
    * @returns {Array<AnalyzeError>}
    */
   getErrors(includeChildren = true)
   {
      const errors = [].concat(...this.errors);

      if (includeChildren)
      {
         this.reports.forEach((report) => { errors.push(...report.getErrors()); });
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
    * Deserializes a JSON object representing a ProjectResult.
    *
    * @param {object}   object - A JSON object of a ProjectResult that was previously serialized.
    *
    * @returns {ProjectResult}
    */
   static parse(object)
   {
      /* istanbul ignore if */
      if (typeof object !== 'object') { throw new TypeError(`parse error: 'object' is not an 'object'.`); }

      const result = Object.assign(new ProjectResult(), object);

      if (result.reports.length > 0)
      {
         result.reports = result.reports.map((report) => { return ModuleReport.parse(report); });
      }

      return result;
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
    * Formats this ProjectResult given the type.
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
