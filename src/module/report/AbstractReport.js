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
    * @param {MethodReport}   methodReport - A MethodReport to associate with this report.
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
    * Returns the associated `MethodReport` or `this`. Both ClassReport and ModuleReport have an `aggregate`
    * MethodReport.
    *
    * @returns {MethodReport}
    */
   get methodReport() { return typeof this._methodReport !== 'undefined' ? this._methodReport : this; }

   /**
    * Increments the associated MethodReport HalsteadData for distinct identifiers.
    *
    * @param {string}   metric - A Halstead metric name.
    * @param {string}   identifier - A Halstead identifier name.
    */
   incrementDistinctHalsteadItems(metric, identifier)
   {
      if (this.isHalsteadMetricDistinct(metric, identifier))
      {
         this.methodReport.halstead[metric].identifiers.push(identifier);

         this.incrementHalsteadMetric(metric, 'distinct');
      }
   }

   /**
    * Increments the associated MethodReport Halstead items including distinct and total counts.
    *
    * @param {string}   metric - A Halstead metric name.
    * @param {string}   identifier - A Halstead identifier name.
    */
   incrementHalsteadItems(metric, identifier)
   {
      this.incrementDistinctHalsteadItems(metric, identifier);

      // Increment total halstead items
      this.incrementHalsteadMetric(metric, 'total');
   }

   /**
    * Increments the associated MethodReport Halstead metric type.
    *
    * @param {string}   metric - A Halstead metric name.
    * @param {string}   type - A Halstead metric type.
    */
   incrementHalsteadMetric(metric, type)
   {
      this.methodReport.halstead[metric][type] += 1;
   }

   /**
    * Increments the associated MethodReport parameter count.
    *
    * @param {number}   count - Value to increase params by.
    */
   incrementParams(count)
   {
      this.methodReport.params += count;
   }

   /**
    * Returns true if a given HalsteadData metric / identifier is not found in the associated MethodReport.
    *
    * @param {string}   metric - A Halstead metric name.
    * @param {string}   identifier - A Halstead identifier name.
    *
    * @returns {boolean}
    */
   isHalsteadMetricDistinct(metric, identifier)
   {
      return !this.methodReport.halstead[metric].identifiers.includes(identifier);
   }
}
