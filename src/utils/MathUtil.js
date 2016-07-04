export default class MathUtil
{
   /**
    * Compacts a 2D matrix that provides only indices which have a value that matches the given `testValue`.
    *
    * @param {Array<Array<number>>} matrix - A matrix to compact.
    * @param {*} testValue - A value to test each entry for equality; default: `1`.
    *
    * @returns {Array<Array<number>>} - The compacted form of the input matrix.
    */
   static compactMatrix(matrix, testValue = 1)
   {
      const compacted = [];

      matrix.forEach((row) =>
      {
         const rowArray = [];
         compacted.push(rowArray);

         row.forEach((entry, entryIndex) => { if (entry === testValue) { rowArray.push(entryIndex); } });
      });

      return compacted;
   }

   /**
    * Creates an 2-dimensional array of the given length.
    *
    * @param {number}   length - Array length for x / y dimensions.
    * @param {number}   value - Default value.
    *
    * @return {Array<Array<number>>}
    */
   static create2DArray(length, value)
   {
      const array = new Array(length);

      for (let cntr = 0; cntr < length; cntr++) { array[cntr] = new Array(length); }

      for (let i = 0; i < length; i++)
      {
         for (let j = 0; j < length; j++) { array[i][j] = value; }
      }

      return array;
   }

   /**
    * Returns the median value from the given array after sorting numerically.
    *
    * @param {Array<number>}  values - An array of numbers to find the median value.
    *
    * @returns {number}
    */
   static getMedian(values)
   {
      // Sort by number.
      values.sort((lhs, rhs) => { return lhs - rhs; });

      // Checks of values.length is odd.
      if (values.length % 2) { return values[(values.length - 1) / 2]; }

      return (values[(values.length - 2) / 2] + values[values.length / 2]) / 2;
   }

   /**
    * Returns the percent of a given value and limit.
    *
    * @param {number}   value - A `value` to calculate the percentage against the given `limit`.
    * @param {number}   limit - A base `limit` that constrains the `value`.
    *
    * @returns {number}
    */
   static getPercent(value, limit)
   {
      return limit === 0 ? 0 : (value / limit) * 100;
   }
}
