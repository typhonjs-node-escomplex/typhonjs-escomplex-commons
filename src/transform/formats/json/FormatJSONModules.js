/**
 * Provides a format transform for ESComplex ModuleReport / ProjectResult instances converting them to JSON that
 * includes only the `filePath`, `srcPath`, and / or `srcPathAlias` of module report entries.
 */
export default class FormatJSONModules
{
   /**
    * Formats a module report as a JSON string. Please note that the exported JSON only contains data for ModuleReport
    * instances contained in a ProjectResult.
    *
    * @param {ModuleReport}   report - A module report.
    *
    * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
    * @property {number}      spacing - (Optional) An integer defining the JSON output spacing.

    * @returns {string}
    */
   formatReport(report, options = {})
   {
      const output = {};

      if (report.filePath) { output.filePath = report.filePath; }
      if (report.srcPath) { output.srcPath = report.srcPath; }
      if (report.srcPathAlias) { output.srcPathAlias = report.srcPathAlias; }

      return typeof options === 'object' && Number.isInteger(options.spacing) ?
       JSON.stringify(output, undefined, options.spacing) : JSON.stringify(output);
   }

   /**
    * Formats a project result modules as plain text.
    *
    * @param {ProjectResult}  result - A project result.
    *
    * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
    * @property {number}      spacing - (Optional) An integer defining the JSON output spacing.
    *
    * @returns {string}
    */
   formatResult(result, options = {})
   {
      const output = { modules: [] };

      result.reports.forEach((report) =>
      {
         const entry = {};

         if (report.filePath) { entry.filePath = report.filePath; }
         if (report.srcPath) { entry.srcPath = report.srcPath; }
         if (report.srcPathAlias) { entry.srcPathAlias = report.srcPathAlias; }

         output.modules.push(entry);
      });

      return typeof options === 'object' && Number.isInteger(options.spacing) ?
       JSON.stringify(output, undefined, options.spacing) : JSON.stringify(output);
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
    * Gets the format name.
    *
    * @returns {string}
    */
   get name()
   {
      return 'json-modules';
   }

   /**
    * Gets the format type.
    *
    * @returns {string}
    */
   get type()
   {
      return 'modules';
   }
}