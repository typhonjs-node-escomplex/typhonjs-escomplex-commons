'use strict';

/**
 * Provides several helper methods to work with method oriented data stored as `this.aggregate` in `ClassReport` /
 * `ModuleReport` and directly in `MethodReport`.
 */
export default class AbstractReport
{
   /**
    * If given assigns the method report to an internal variable. This is used by `ClassReport` and `ModuleReport`
    * which stores a `MethodReport` respectively in `this.aggregate`.
    *
    * @param {MethodReport}   methodReport -
    */
   constructor(methodReport)
   {
      /**
       * Stores any associated `MethodReport`.
       * @type {MethodReport}
       * @private
       */
      this._methodReport = methodReport;
   }

   /**
    * Cleans up any house keeping member variables.
    *
    * @returns {AbstractReport}
    */
   finalize()
   {
      delete this._methodReport;

      return this;
   }

   /**
    * Returns the associated `MethodReport` or this.
    *
    * @returns {MethodReport}
    */
   get methodReport() { return typeof this._methodReport !== 'undefined' ? this._methodReport : this; }

   incrementDistinctHalsteadItems(metric, identifier)
   {
      if (this.hasOwnProperty(identifier))
      {
         // Avoid clashes with built-in property names.
         this.incrementDistinctHalsteadItems(metric, `_${identifier}`);
      }
      else if (this.isHalsteadMetricDistinct(metric, identifier))
      {
         // Record distinct Halstead metric.
         this.methodReport.halstead[metric].identifiers.push(identifier);

         this.incrementHalsteadMetric(metric, 'distinct');
      }
   }

   incrementHalsteadItems(metric, identifier)
   {
      this.incrementDistinctHalsteadItems(metric, identifier);

      // Increment total halstead items
      this.incrementHalsteadMetric(metric, 'total');
   }

   incrementHalsteadMetric(metric, type)
   {
      this.methodReport.halstead[metric][type] += 1;
   }

   incrementParams(count)
   {
      this.methodReport.params += count;
   }

   isHalsteadMetricDistinct(metric, identifier)
   {
      return !this.methodReport.halstead[metric].identifiers.includes(identifier);
   }
}
