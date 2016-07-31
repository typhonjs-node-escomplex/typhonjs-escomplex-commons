import TransformFormat  from '../../transform/TransformFormat';

/**
 * Provides several helper methods to work with method oriented data stored as `this.aggregate` in `ClassReport` /
 * `ModuleReport` and directly in `ClassMethodReport` / `ModuleMethodReport`.
 */
export default class AbstractReport
{
   /**
    * If given assigns the method report to an internal variable. This is used by `ClassReport` and `ModuleReport`
    * which stores a `AggregateMethodReport` respectively in `this.aggregate`.
    *
    * @param {AggregateMethodReport}   aggregateReport - An AggregateMethodReport to associate with this report.
    */
   constructor(aggregateReport = void 0)
   {
      /**
       * Stores any associated `AggregateMethodReport`.
       * @type {AggregateMethodReport}
       */
      this.aggregate = aggregateReport;
   }

   /**
    * Returns the associated `AggregateMethodReport` or `this`. Both ClassReport and ModuleReport have an
    * `aggregateMethod` AggregateMethodReport.
    *
    * @returns {AggregateMethodReport}
    */
   get aggregateReport() { return typeof this.aggregate !== 'undefined' ? this.aggregate : this; }

   /**
    * Increments the associated aggregate report HalsteadData for distinct identifiers.
    *
    * @param {string}   metric - A Halstead metric name.
    * @param {string}   identifier - A Halstead identifier name.
    */
   incrementDistinctHalsteadItems(metric, identifier)
   {
      if (this.isHalsteadMetricDistinct(metric, identifier))
      {
         this.aggregateReport.halstead[metric].identifiers.push(identifier);

         this.incrementHalsteadMetric(metric, 'distinct');
      }
   }

   /**
    * Increments the associated aggregate report Halstead items including distinct and total counts.
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
    * Increments the associated aggregate report Halstead metric type.
    *
    * @param {string}   metric - A Halstead metric name.
    * @param {string}   type - A Halstead metric type.
    */
   incrementHalsteadMetric(metric, type)
   {
      this.aggregateReport.halstead[metric][type] += 1;
   }

   /**
    * Increments the associated aggregate report parameter count.
    *
    * @param {number}   count - Value to increase params by.
    */
   incrementParams(count)
   {
      this.aggregateReport.params += count;
   }

   /**
    * Returns true if a given HalsteadData metric / identifier is not found in the associated aggregate report.
    *
    * @param {string}   metric - A Halstead metric name.
    * @param {string}   identifier - A Halstead identifier name.
    *
    * @returns {boolean}
    */
   isHalsteadMetricDistinct(metric, identifier)
   {
      return this.aggregateReport.halstead[metric].identifiers.indexOf(identifier) === -1;
   }

   /**
    * Formats this report given the type.
    *
    * @param {string}   name - The name of formatter to use.
    *
    * @param {object}   options - (Optional) One or more optional parameters to pass to the formatter.
    *
    * @returns {string}
    */
   toFormat(name, options = void 0)
   {
      return TransformFormat.format(this, name, options);
   }
}
