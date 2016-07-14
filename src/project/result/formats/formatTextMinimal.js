/**
 * Formats a project result as minimal / plain text.
 *
 * @param {ProjectResult}  result - A project result.
 *
 * @returns {string}
 */
export default function(result)
{
   const reportsAvailable = result.getSetting('serializeReports', false);

   return result.reports.reduce((formatted, report) =>
   {
      return `${formatted}${formatModule(report, reportsAvailable)}\n`;
   }, '');
}

/**
 * Formats a module report.
 *
 * @param {ModuleReport}   report - A module report.
 * @param {boolean}        reportsAvailable - Indicates that the report metric data is available.
 *
 * @returns {string}
 */
function formatModule(report, reportsAvailable)
{
   if (reportsAvailable)
   {
      return [
         report.srcPath, ': ', report.maintainability,
         formatMethods(report.methods)
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
function formatMethod(methodReport)
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
function formatMethods(methodReports)
{
   return methodReports.reduce((formatted, r) => { return `${formatted}\n${formatMethod(r)}`; }, '');
}
