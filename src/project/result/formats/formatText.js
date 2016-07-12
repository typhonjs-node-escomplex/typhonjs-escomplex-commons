/**
 * Formats a project result as plain text.
 *
 * @param {ProjectResult}  result - A project result.
 *
 * @returns {string}
 */
export default function(result)
{
   return result.reports.reduce((formatted, report) =>
   {
      return `${formatted}${formatModule(report)}\n\n`;
   }, formatProject(result));
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
      '  Function: ', methodReport.name, '\n',
      '    Line start: ', methodReport.lineStart, '\n',
      '    Line end: ', methodReport.lineEnd, '\n',
      '    Physical LOC: ', methodReport.sloc.physical, '\n',
      '    Logical LOC: ', methodReport.sloc.logical, '\n',
      '    Parameter count: ', methodReport.params, '\n',
      '    Cyclomatic complexity: ', methodReport.cyclomatic, '\n',
      '    Cyclomatic complexity density: ', methodReport.cyclomaticDensity, '%\n',
      '    Halstead difficulty: ', methodReport.halstead.difficulty, '\n',
      '    Halstead volume: ', methodReport.halstead.volume, '\n',
      '    Halstead effort: ', methodReport.halstead.effort
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
   return methodReports.reduce((formatted, r) => { return `${formatted}\n\n${formatMethod(r)}`; }, '');
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
      report.srcPath, '\n\n',
      '  Physical LOC: ', report.aggregate.sloc.physical, '\n',
      '  Logical LOC: ', report.aggregate.sloc.logical, '\n',
      '  Mean parameter count: ', report.params, '\n',
      '  Cyclomatic complexity: ', report.aggregate.cyclomatic, '\n',
      '  Cyclomatic complexity density: ', report.aggregate.cyclomaticDensity, '%\n',
      '  Maintainability index: ', report.maintainability, '\n',
      '  Dependency count: ', report.dependencies.length,
      formatMethods(report.methods)
   ].join('');
}

/**
 * Formats a project result.
 *
 * @param {ProjectResult}  result - A project result.
 *
 * @returns {string}
 */
function formatProject(result)
{
   return [
      'Mean per-function logical LOC: ', result.loc, '\n',
      'Mean per-function parameter count: ', result.params, '\n',
      'Mean per-function cyclomatic complexity: ', result.cyclomatic, '\n',
      'Mean per-function Halstead effort: ', result.effort, '\n',
      'Mean per-module maintainability index: ', result.maintainability, '\n',
      'First-order density: ', result.firstOrderDensity, '%\n',
      'Change cost: ', result.changeCost, '%\n',
      'Core size: ', result.coreSize, '%\n\n'
   ].join('');
}
