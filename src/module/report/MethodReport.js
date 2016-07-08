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
    * Provides a default array and indices for summing maintainability metrics.
    *
    * @returns {{sums: number[], indices: {cyclomatic: number, effort: number, loc: number, params: number}}}
    */
   static getMaintainabilityMetrics()
   {
      return { sums: [0, 0, 0, 0], indices: s_INDICES_MAINTAINABILITY };
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
      if (typeof object !== 'object') { throw new TypeError('parse error: `object` is not an `object`.'); }

      return Object.assign(new MethodReport(), object);
   }

   /**
    * Provides a convenience method to increment metric sums given an object hash of indices.
    *
    * @param {Array<number>}  sums - Running sums for metric calculation.
    * @param {object}         indices - Indices into the sums array for specific metrics.
    */
   sumMetrics(sums, indices)
   {
      /* istanbul ignore if */
      if (!Array.isArray(sums)) { throw new TypeError('sumMetrics error: `sums` is not an `array`.'); }

      /* istanbul ignore if */
      if (typeof indices !== 'object') { throw new TypeError('sumMetrics error: `indices` is not an `object`.'); }

      for (const key in indices)
      {
         switch (key)
         {
            case 'cyclomatic':
               sums[indices[key]] += this.cyclomatic;
               break;

            case 'effort':
               sums[indices[key]] += this.halstead.effort;
               break;

            case 'loc':
               sums[indices[key]] += this.sloc.logical;
               break;

            case 'params':
               sums[indices[key]] += this.params;
               break;
         }
      }
   }
}

/**
 * Defines the default maintainability metrics supported by `sumMetrics`.
 * @type {{cyclomatic: number, effort: number, loc: number, params: number}}
 * @ignore
 */
const s_INDICES_MAINTAINABILITY =
{
   cyclomatic: 0,
   effort: 1,
   loc: 2,
   params: 3
};
