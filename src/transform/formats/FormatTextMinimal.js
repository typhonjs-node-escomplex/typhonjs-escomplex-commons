/**
 * Provides a format transform for ESComplex ModuleReport / ProjectResult instances converting them to plain text with
 * minimal metrics.
 */
export default class FormatTextMinimal
{
   /**
    * Formats a module report as a JSON string.
    *
    * @param {ModuleReport}   report - A module report.
    *
    * @returns {string}
    */
   formatReport()
   {
      return '';
   }

   /**
    * Formats a project result as minimal / plain text.
    *
    * @param {ProjectResult}  result - A project result.
    *
    * @returns {string}
    */
   formatResult(result)
   {
      const reportsAvailable = result.getSetting('serializeReports', false);

      return result.reports.reduce((formatted, report) =>
      {
         return `${formatted}${this._formatModule(report, reportsAvailable)}\n`;
      }, '');
   }

   /**
    * Gets the file extension.
    *
    * @returns {string}
    */
   get extension()
   {
      return 'txt';
   }

   /**
    * Gets the format type.
    *
    * @returns {string}
    */
   get type()
   {
      return 'text-minimal';
   }

   /**
    * Formats a module report.
    *
    * @param {ModuleReport}   report - A module report.
    * @param {boolean}        reportsAvailable - Indicates that the report metric data is available.
    *
    * @returns {string}
    */
   _formatModule(report, reportsAvailable)
   {
      if (reportsAvailable)
      {
         return [
            report.srcPath, ': ', report.maintainability,
            this._formatMethods(report.methods)
         ].join('');
      }
      else
      {
         return `${report.srcPath}`;
      }
   }

   /**
    * Formats a method report.
    *
    * @param {MethodReport}   methodReport - A method report.
    *
    * @returns {string}
    */
   _formatMethod(methodReport)
   {
      return [
         '  ', methodReport.name, ' (', methodReport.lineStart, '): ', methodReport.cyclomatic
      ].join('');
   }

   /**
    * Formats a module reports methods array.
    *
    * @param {Array<MethodReport>}  methodReports - An array of MethodReport instances to format.
    *
    * @returns {string}
    */
   _formatMethods(methodReports)
   {
      return methodReports.reduce((formatted, r) => { return `${formatted}\n${this._formatMethod(r)}`; }, '');
   }
}