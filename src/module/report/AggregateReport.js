import AbstractReport   from './AbstractReport';
import HalsteadData     from './HalsteadData';

/**
 * Provides the aggregate report object which stores base data pertaining to a single method / function or cumulative
 * aggregate data for a ModuleReport / ClassReport.
 */
export default class AggregateReport extends AbstractReport
{
   /**
    * Initializes aggregate report.
    *
    * @param {number}   lineStart - Start line of method.
    * @param {number}   lineEnd - End line of method.
    */
   constructor(lineStart = 0, lineEnd = 0)
   {
      super();

      /**
       * The cyclomatic complexity of the method.
       * @type {number}
       */
      this.cyclomatic = 1;

      /**
       * The cyclomatic density of the method.
       * @type {number}
       */
      this.cyclomaticDensity = 0;

      /**
       * Stores the Halstead data instance.
       * @type {HalsteadData}
       */
      this.halstead = new HalsteadData();

      /**
       * The number of parameters for the method or aggregate report.
       * @type {number}
       */
      this.params = 0;

      /**
       * The source lines of code for the method.
       * @type {{logical: number, physical: number}}
       */
      this.sloc = { logical: 0, physical: lineEnd - lineStart + 1 };
   }

   /**
    * Deserializes a JSON object representing a MethodReport.
    *
    * @param {object}   object - A JSON object of a MethodReport that was previously serialized.
    *
    * @returns {AggregateReport}
    */
   static parse(object)
   {
      /* istanbul ignore if */
      if (typeof object !== 'object') { throw new TypeError(`parse error: 'object' is not an 'object'.`); }

      return Object.assign(new AggregateReport(), object);
   }
}