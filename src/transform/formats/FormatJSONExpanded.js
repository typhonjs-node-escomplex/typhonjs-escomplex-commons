/**
 * Provides a format transform for ESComplex ModuleReport / ProjectResult instances converting them to an expanded
 * JSON string with spacing of 3.
 */
export default class FormatJSONExpanded
{
   /**
    * Formats a module report as a JSON string.
    *
    * @param {ModuleReport}   report - A module report.
    *
    * @returns {string}
    */
   formatReport(report)
   {
      return JSON.stringify(report, undefined, 3);
   }

   /**
    * Formats a project result as a JSON string.
    *
    * @param {ProjectResult}  result - A project result.
    *
    * @returns {string}
    */
   formatResult(result)
   {
      return JSON.stringify(result, undefined, 3);
   }

   /**
    * Gets the file extension.
    *
    * @returns {string}
    */
   get extension()
   {
      return 'json';
   }

   /**
    * Gets the format type.
    *
    * @returns {string}
    */
   get type()
   {
      return 'json-expanded';
   }
}