import AggregateReport  from './AggregateReport';
import AnalyzeError     from '../../analyze/AnalyzeError';

/**
 * Provides the method report object which stores data pertaining to a single method / function.
 */
export default class MethodReport extends AggregateReport
{
   /**
    * Initializes method report.
    *
    * @param {string}   name - Name of the method.
    * @param {number}   lineStart - Start line of method.
    * @param {number}   lineEnd - End line of method.
    * @param {number}   params - Number of parameters for method.
    */
   constructor(name = '', lineStart = 0, lineEnd = 0, params = 0)
   {
      super(lineStart, lineEnd);

      /**
       * Stores any analysis errors.
       * @type {Array}
       */
      this.errors = [];

      /**
       * Stores the end line for the method.
       * @type {number}
       */
      this.lineEnd = lineEnd;

      /**
       * Stores the start line for the method.
       * @type {number}
       */
      this.lineStart = lineStart;

      /**
       * The name of the method.
       * @type {string}
       */
      this.name = name;

      /**
       * The number of parameters for the method or report.
       * @type {number}
       */
      this.params = params;
   }

   /**
    * Clears all errors stored in the method report.
    */
   clearErrors()
   {
      this.errors = [];
   }

   /**
    * Gets all errors stored in the method report.
    *
    * @returns {Array<AnalyzeError>}
    */
   getErrors()
   {
      return [].concat(...this.errors);
   }

   /**
    * Deserializes a JSON object representing a MethodReport.
    *
    * @param {object}   object - A JSON object of a MethodReport that was previously serialized.
    *
    * @returns {MethodReport}
    */
   static parse(object)
   {
      /* istanbul ignore if */
      if (typeof object !== 'object') { throw new TypeError(`parse error: 'object' is not an 'object'.`); }

      const methodReport = Object.assign(new MethodReport(), object);

      if (methodReport.errors.length > 0)
      {
         methodReport.errors = methodReport.errors.map((error) => { return Object.assign(new AnalyzeError(), error); });
      }

      return methodReport;
   }
}
