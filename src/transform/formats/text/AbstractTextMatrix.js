import ObjectUtil from '../../../utils/ObjectUtil';

/**
 * Provides the base text format transform for ProjectResult matrix list entries.
 */
export default class AbstractTextMatrix
{
   constructor(headers = {}, keys = {})
   {
      this._headers = headers;
      this._keys = keys;
   }

   /**
    * Currently there are no matrix lists stored in modules, but the implementation is complete in case a ModuleReport
    * does have a matrix list.
    *
    * @returns {string}
    */
   formatReport()
   {
      return '';
   }

   /**
    * Formats a matrix list stored in a ProjectResult.
    *
    * @param {ProjectResult}  result - A project result.
    *
    * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
    * @property {string}      matrixKey - An entry key found in the ProjectResult to output.
    *
    * @returns {string}
    */
   formatResult(result, options = {})
   {
      let localOptions = Object.assign({}, this._keys);
      localOptions = Object.assign(localOptions, options);

      const matrixList = ObjectUtil.safeAccess(result, localOptions.matrixList);

      /* istanbul ignore if */
      if (!Array.isArray(matrixList) || !Array.isArray(result.reports) ||
       typeof this._headers.entryPrepend !== 'string')
      {
         return '';
      }

      return this._formatMatrixList(result, matrixList, localOptions);
   }

   /**
    * Returns a string representing the adjacency relationships by printing out the report index followed by
    * dependent ModuleReport indices / `srcPaths`.
    *
    * @param {ProjectResult}                          result - A project result instance containing the matrix list.
    *
    * @param {Array<{row: number, cols: number[]}>}   matrixList - The matrix list to be serialized.
    *
    * @param {object}                                 options - (Optional) An object hash of options.
    * @propert {boolean}                              zeroIndex - If true module report indexes are zero indexed.
    * @propert {boolean}                              matrixFilePath - If true the module `filePath` is serialized.
    *
    * @returns {string}
    * @private
    */
   _formatMatrixList(result, matrixList, options)
   {
      let output = '';

      const plus1 = typeof options.zeroIndex === 'boolean' && options.zeroIndex ? 0 : 1;
      const path = typeof options.matrixFilePath === 'boolean' && options.matrixFilePath ? 'filePath' : 'srcPath';

      matrixList.forEach((entry) =>
      {
         output += `${this._headers.entryPrepend}${entry.row + plus1}:\t${ObjectUtil.safeAccess(
          result.reports[entry.row], path)}\n`;

         entry.cols.forEach((colIndex) =>
         {
            output += `\t${this._headers.entryPrepend}${colIndex + plus1}:\t${ObjectUtil.safeAccess(
             result.reports[colIndex], path)}\n`;
         });

         output += '\n';
      });

      return output;
   }
}