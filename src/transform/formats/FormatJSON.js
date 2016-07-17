/**
 * Provides a format transform for ESComplex ModuleReport / ProjectResult instances converting them to a JSON string.
 */
export default class FormatJSON
{
   /**
    * Formats a module report as a JSON string.
    *
    * @param {ModuleReport}   report - A module report.
    * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
    * @property {number}      spacing - (Optional) An integer defining the JSON output spacing.
    *
    * @returns {string}
    */
   formatReport(report, options = {})
   {
      return typeof options === 'object' && Number.isInteger(options.spacing) ?
       JSON.stringify(report, undefined, options.spacing) : JSON.stringify(report);
   }

   /**
    * Formats a project result as a JSON string.
    *
    * @param {ProjectResult}  result - A project result.
    * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
    * @property {number}      spacing - (Optional) An integer defining the JSON output spacing.
    *
    * @returns {string}
    */
   formatResult(result, options = {})
   {
      return typeof options === 'object' && Number.isInteger(options.spacing) ?
       JSON.stringify(result, undefined, options.spacing) : JSON.stringify(result);
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