/**
 * Provides a format transform for ESComplex ModuleReport / ProjectResult instances converting them to plain text.
 */
export default class FormatText
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
    * Formats a project result as plain text.
    *
    * @param {ProjectResult}  result - A project result.
    *
    * @returns {string}
    */
   formatResult(result)
   {
      const reportsAvailable = result.getSetting('serializeReports', false);

      const newLine = reportsAvailable ? '\n\n' : '\n';

      return result.reports.reduce((formatted, report) =>
      {
         return `${formatted}${this._formatModule(report, reportsAvailable)}${newLine}`;
      }, this._formatProject(result));
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
      return 'text';
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
   _formatMethods(methodReports)
   {
      return methodReports.reduce((formatted, r) => { return `${formatted}\n\n${this._formatMethod(r)}`; }, '');
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
            report.srcPath, '\n\n',
            '  Physical LOC: ', report.aggregate.sloc.physical, '\n',
            '  Logical LOC: ', report.aggregate.sloc.logical, '\n',
            '  Mean parameter count: ', report.params, '\n',
            '  Cyclomatic complexity: ', report.aggregate.cyclomatic, '\n',
            '  Cyclomatic complexity density: ', report.aggregate.cyclomaticDensity, '%\n',
            '  Maintainability index: ', report.maintainability, '\n',
            '  Dependency count: ', report.dependencies.length,
            this._formatMethods(report.methods)
         ].join('');
      }
      else
      {
         return `${report.srcPath}`;
      }
   }

   /**
    * Formats a project result.
    *
    * @param {ProjectResult}  result - A project result.
    *
    * @returns {string}
    */
   _formatProject(result)
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
}