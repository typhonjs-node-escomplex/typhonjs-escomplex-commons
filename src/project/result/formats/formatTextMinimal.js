/**
 * Formats a project result as minimal / plain text.
 *
 * @param {ProjectResult}  result - A project result.
 *
 * @returns {string}
 */
export default function(result)
{
   return result.reports.reduce((formatted, report) => { return `${formatted}${formatModule(report)}\n`; }, '');
}

/**
 * Formats a module report.
 *
 * @param {ModuleReport}  report - A module report.
 *
 * @returns {string}
 */
function formatModule(report)
{
   return [
      report.srcPath, ': ', report.maintainability,
      formatMethods(report.methods)
   ].join('');
}

/**
 * Formats a method report.
 *
 * @param {MethodReport}  methodReport - A method report.
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
