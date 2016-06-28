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
    * Initializes the report
    *
    * @param {number}   lineStart - Start line of file / module.
    * @param {number}   lineEnd - End line of file / module.
    */
   constructor(lineStart, lineEnd)
   {
      super(new MethodReport('', lineStart, lineEnd, 0));

      /**
       * Stores the aggregate function data.
       * @type {{}}
       */
      this.aggregate = this._methodReport;

      /**
       * Stores all class data.
       * @type {Array}
       */
      this.classes = [];

      /**
       * Stores all module method data.
       * @type {Array}
       */
      this.methods = [];

      /**
       * Stores all parsed dependencies.
       * @type {Array}
       */
      this.dependencies = [];

      /**
       * Stores the maintainability index for a report
       * @type {number}
       */
      this.maintainability = 171;

      /**
       * Stores the current class report scope stack.
       * @type {Array}
       */
      this._scopeStackClass = [];

      /**
       * Stores the current function report scope stack.
       * @type {Array}
       */
      this._scopeStackMethod = [];
   }

   addDependencies(dependencies)
   {
      if (typeof dependencies === 'object' || Array.isArray(dependencies))
      {
         this.dependencies = this.dependencies.concat(dependencies);
      }
   }

   /**
    * Creates a report scope when a class or function is entered.
    *
    * @param {string}   type - Type of report to create.
    * @param {string}   name - Name of the function.
    * @param {number}   lineStart - Start line of function.
    * @param {number}   lineEnd - End line of function.
    * @param {number}   params - Number of parameters for function.
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
            report = new MethodReport(name, lineStart, lineEnd, params);

            // If an existing class report / scope exists also push the function to the class report.
            const classReport = this.getCurrentClassReport();

            if (classReport)
            {
               classReport.methods.push(report);
            }
            else
            {
               this.methods.push(report);
            }

            this._scopeStackMethod.push(report);

            break;

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

   getCurrentClassReport()
   {
      return this._scopeStackClass.length > 0 ? this._scopeStackClass[this._scopeStackClass.length - 1] : void 0;
   }

   getCurrentMethodReport()
   {
      return this._scopeStackMethod.length > 0 ? this._scopeStackMethod[this._scopeStackMethod.length - 1] : void 0;
   }

   halsteadItemEncountered(metric, identifier)
   {
      const currentClassReport = this.getCurrentClassReport();
      const currentMethodReport = this.getCurrentMethodReport();

      this.incrementHalsteadItems(metric, identifier);

      if (currentClassReport) { currentClassReport.incrementHalsteadItems(metric, identifier); }

      if (currentMethodReport) { currentMethodReport.incrementHalsteadItems(metric, identifier); }
   }

   incrementCyclomatic(amount)
   {
      const currentClassReport = this.getCurrentClassReport();
      const currentMethodReport = this.getCurrentMethodReport();

      this.aggregate.cyclomatic += amount;

      if (currentClassReport) { currentClassReport.cyclomatic += amount; }
      if (currentMethodReport) { currentMethodReport.cyclomatic += amount; }
   }

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
