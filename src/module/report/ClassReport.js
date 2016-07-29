import AbstractReport      from './AbstractReport';
import AnalyzeError        from '../../analyze/AnalyzeError';
import AggregateReport     from './AggregateReport';
import ClassMethodReport   from './ClassMethodReport';
import MethodAverage       from './averages/MethodAverage';

import ReportType          from '../../types/ReportType';

/**
 * Provides the class report object which stores data pertaining to a single ES6 class.
 *
 * Methods that are stored as ClassMethodReport instances in the `methods` member variable.
 */
export default class ClassReport extends AbstractReport
{
   /**
    * Returns the enum for the report type.
    * @returns {CLASS}
    */
   get type() { return ReportType.CLASS; }

   /**
    * Initializes class report.
    *
    * @param {string}   name - Name of the class.
    * @param {number}   lineStart - Start line of class.
    * @param {number}   lineEnd - End line of class.
    */
   constructor(name = '', lineStart = 0, lineEnd = 0)
   {
      super(new AggregateReport(lineStart, lineEnd));

      /**
       * Stores any analysis errors.
       * @type {Array}
       */
      this.errors = [];

      /**
       * Stores the end line for the class.
       * @type {number}
       */
      this.lineEnd = lineEnd;

      /**
       * Stores the start line for the class.
       * @type {number}
       */
      this.lineStart = lineStart;

      /**
       * Stores all method data.
       * @type {Array<ClassMethodReport>}
       */
      this.methods = [];

      /**
       * Stores the average method metric data.
       * @type {HalsteadAverage}
       */
      this.methodAverage = new MethodAverage();

      /**
       * The name of the class.
       * @type {string}
       */
      this.name = name;
   }

   /**
    * Clears all errors stored in the class report and by default any class methods.
    *
    * @param {boolean}  clearChildren - (Optional) If false then class method errors are not cleared; default (true).
    */
   clearErrors(clearChildren = true)
   {
      this.errors = [];

      if (clearChildren)
      {
         this.methods.forEach((report) => { report.clearErrors(); });
      }
   }

   /**
    * Gets all errors stored in the class report and by default any class methods.
    *
    * @param {object}   options - Optional parameters.
    * @property {boolean}  includeChildren - If false then module errors are not included; default (true).
    * @property {boolean}  includeObject - If true then results will be an array of object hashes containing `source`
    *                                      (the source report object of the error) and `error`
    *                                      (an AnalyzeError instance) keys; default (false).
    *
    * @returns {Array<AnalyzeError|{error: AnalyzeError, source: *}>}
    */
   getErrors(options = { includeChildren: true, includeObject: false })
   {
      /* istanbul ignore if */
      if (typeof options !== 'object') { throw new TypeError(`getErrors error: 'options' is not an 'object'.`); }

      // By default set includeChildren to true.
      /* istanbul ignore if */
      if (typeof options.includeChildren !== 'boolean') { options.includeChildren = true; }

      // If `includeObject` is true then return an object hash with the source and error otherwise return the error.
      const errors = options.includeObject ? this.errors.map((entry) => { return { error: entry, source: this }; }) :
       [].concat(...this.errors);

      if (options.includeChildren)
      {
         this.methods.forEach((report) => { errors.push(...report.getErrors(options)); });
      }

      return errors;
   }

   /**
    * Returns the name / id associated with this report.
    * @returns {string}
    */
   getName()
   {
      return this.name;
   }

   /**
    * Deserializes a JSON object representing a ClassReport.
    *
    * @param {object}   object - A JSON object of a ClassReport that was previously serialized.
    *
    * @returns {ClassReport}
    */
   static parse(object)
   {
      /* istanbul ignore if */
      if (typeof object !== 'object') { throw new TypeError(`parse error: 'object' is not an 'object'.`); }

      const classReport = Object.assign(new ClassReport(), object);

      if (classReport.errors.length > 0)
      {
         classReport.errors = classReport.errors.map((error) => AnalyzeError.parse(error));
      }

      if (classReport.methods.length > 0)
      {
         classReport.methods = classReport.methods.map((methodReport) => ClassMethodReport.parse(methodReport));
      }

      return classReport;
   }
}
