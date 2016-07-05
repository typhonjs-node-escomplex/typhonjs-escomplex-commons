/**
 * Provides common math utilities.
 */
export default class MathUtil
{
   /**
    * Compacts a 2D matrix testing entries against a testValue with a default value of `1` for inclusion. The resulting
    * compacted list has an array per row with entries that correspond to the column index that passed the test.
    *
    * @param {Array<Array<number>>} matrix - A matrix to compact / compress.
    * @param {*}                    testValue - A value to test strict equality to include entry for compaction.
    *
    * @returns {Array<Array<number>>}
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
   static create2DArray(length = 0, value = 0)
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
    * Returns the median / middle value from the given array after sorting numerically. If values length is odd the
    * middle value in the array is returned otherwise if even two middle values are summed then divided by 2.
    *
    * @param {Array<number>}  values - An Array of numerical values.
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
