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

      this.methods.forEach((methodReport) => { methodReport.finalize(); });

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
      if (typeof object !== 'object') { throw new TypeError(`parse error: 'object' is not an 'object'.`); }

      const classReport = Object.assign(new ClassReport(), object);

      // Must explicitly assign `aggregate` to `classReport._methodReport` and re-assign data.
      classReport.aggregate = Object.assign(classReport._methodReport, object.aggregate);

      if (classReport.methods.length > 0)
      {
         classReport.methods = classReport.methods.map((methodReport) => { return MethodReport.parse(methodReport); });
      }

      return classReport;
   }
}
