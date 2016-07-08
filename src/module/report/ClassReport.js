import AbstractReport   from './AbstractReport';
import MethodReport     from './MethodReport';

/**
 * Provides the class report object which stores data pertaining to a single ES6 class.
 *
 * Methods that are stored as MethodReports in the `methods` member variable.
 */
export default class ClassReport extends AbstractReport
{
   /**
    * Initializes class report.
    *
    * @param {string}   name - Name of the class.
    * @param {number}   lineStart - Start line of class.
    * @param {number}   lineEnd - End line of class.
    */
   constructor(name = '', lineStart = 0, lineEnd = 0)
   {
      super(new MethodReport('', lineStart, lineEnd, 0));

      /**
       * Stores the aggregate method data.
       * @type {MethodReport}
       */
      this.aggregate = this._methodReport;

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
       * @type {Array<MethodReport>}
       */
      this.methods = [];

      /**
       * The name of the class.
       * @type {string}
       */
      this.name = name;
   }

   /**
    * Cleans up any house keeping member variables.
    *
    * @returns {ClassReport}
    */
   finalize()
   {
      super.finalize();

      this.methods.forEach((report) => { report.finalize(); });

      return this;
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
      if (typeof object !== 'object') { throw new TypeError('parse error: `object` is not an `object`.'); }

      const report = Object.assign(new ClassReport(), object);

      // Must explicitly assign `aggregate` to `report._methodReport` and re-assign data.
      report.aggregate = Object.assign(report._methodReport, object.aggregate);

      if (report.methods.length > 0)
      {
         report.methods = report.methods.map((report) => { return MethodReport.parse(report); });
      }

      return report;
   }
}
