import ReportType from '../../../types/ReportType';

/**
 * Provides a format transform for ESComplex ModuleReport / ProjectResult instances converting them to JSON that
 * includes only the `filePath`, `srcPath`, and / or `srcPathAlias` of module report entries.
 */
export default class FormatJSONModules
{
   /**
    * Formats a report as a JSON string with just module data.
    *
    * @param {ClassReport|MethodReport|ModuleReport|ProjectResult} report - A report to format.
    *
    * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
    * @property {number}      spacing - (Optional) An integer defining the JSON output spacing.
    *
    * @returns {string}
    */
   formatReport(report, options = {})
   {
      switch (report.type)
      {
         case ReportType.MODULE:
            return this.formatModule(report, options);

         case ReportType.PROJECT:
            return this.formatProject(report, options);

         default:
            console.warn(`formatReport '${this.name}' warning: unsupported report type '${report.type}'.`);
            return '';
      }
   }

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
   formatModule(report, options = {})
   {
      const output = {};

      if (report.filePath) { output.filePath = report.filePath; }
      if (report.srcPath) { output.srcPath = report.srcPath; }
      if (report.srcPathAlias) { output.srcPathAlias = report.srcPathAlias; }

      return typeof options === 'object' && Number.isInteger(options.spacing) ?
       JSON.stringify(output, void 0, options.spacing) : JSON.stringify(output);
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
   formatProject(result, options = {})
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
       JSON.stringify(output, void 0, options.spacing) : JSON.stringify(output);
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

   /**
    * Returns whether a given ReportType is supported by this format transform.
    *
    * @param {ReportType}  reportType - A given report type.
    *
    * @returns {boolean}
    */
   isSupported(reportType)
   {
      switch (reportType)
      {
         case ReportType.MODULE:
         case ReportType.PROJECT:
            return true;

         default:
            return false;
      }
   }
}