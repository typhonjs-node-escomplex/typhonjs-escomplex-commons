/**
 * Provides a format transform for ESComplex ModuleReport / ProjectResult instances converting them to a JSON string.
 */
export default class FormatJSON
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
      return JSON.stringify(report);
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
      return JSON.stringify(result);
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
      return 'json';
   }
}