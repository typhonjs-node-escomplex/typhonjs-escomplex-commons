'use strict';

import AbstractReport   from './AbstractReport.js';
import ClassReport      from './ClassReport.js';
import MethodReport     from './MethodReport.js';

/**
 * Provides the default report object which stores data pertaining to a single file / module being processed.
 */
export default class ModuleReport extends AbstractReport
{
   /**
    * Initializes the report.
    *
    * @param {number}   lineStart - Start line of file / module.
    * @param {number}   lineEnd - End line of file / module.
    */
   constructor(lineStart, lineEnd)
   {
      super(new MethodReport('', lineStart, lineEnd, 0));

      /**
       * Stores the aggregate MethodReport for the module.
       * @type {MethodReport}
       */
      this.aggregate = this._methodReport;

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
       * Stores the maintainability index for a report.
       * @type {number}
       */
      this.maintainability = 171;

      /**
       * Stores all module MethodReport data found outside of any ES6 classes.
       * @type {Array<MethodReport>}
       */
      this.methods = [];

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
            throw new Error('createScope error: Unknown scope type.');
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
      super.finalize();

      delete this._scopeStackClass;
      delete this._scopeStackMethod;

      return this;
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

      if (currentClassReport) { currentClassReport.cyclomatic += amount; }
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
      }
   }
}
