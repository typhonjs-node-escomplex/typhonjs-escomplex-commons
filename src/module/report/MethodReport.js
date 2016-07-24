import AbstractReport   from './AbstractReport';
import HalsteadData     from './HalsteadData';

/**
 * Provides the method report object which stores data pertaining to a single method / function.
 *
 *
 */
export default class MethodReport extends AbstractReport
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
       * The number of parameters for the method.
       * @type {number}
       */
      this.params = params;

      /**
       * The source lines of code for the method.
       * @type {{logical: number, physical: number}}
       */
      this.sloc = { logical: 0, physical: lineEnd - lineStart + 1 };
   }

   /**
    * Cleans up any house keeping member variables.
    *
    * @returns {MethodReport}
    */
   finalize()
   {
      super.finalize();

      return this;
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

      return Object.assign(new MethodReport(), object);
   }
}
