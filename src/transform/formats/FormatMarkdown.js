import StringUtil from '../../utils/StringUtil';

const s_SAFE = StringUtil.safeStringsObject;

/**
 * Provides a format transform for ESComplex ModuleReport / ProjectResult instances converting them to a markdown
 * string.
 */
export default class FormatMarkdown
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
    * Formats a project result as markdown.
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
      return 'md';
   }

   /**
    * Gets the format name.
    *
    * @returns {string}
    */
   get name()
   {
      return 'markdown';
   }

   /**
    * Gets the format type.
    *
    * @returns {string}
    */
   get type()
   {
      return 'markdown';
   }

   /**
    * Formats a method report.
    *
    * @param {MethodReport}  methodReport - A method report.
    *
    * @returns {string}
    * @private
    */
   _formatMethod(methodReport)
   {
      return s_SAFE(methodReport,
         `* Function: **${methodReport.name.replace('<', '&lt;')}**\n`,
         ['    * Line start: ',                      'lineStart'],
         ['    * Line end: ',                        'lineEnd'],
         ['    * Physical LOC: ',                    'sloc.physical'],
         ['    * Logical LOC: ',                     'sloc.logical'],
         ['    * Parameter count: ',                 'params'],
         ['    * Cyclomatic complexity: ',           'cyclomatic'],
         ['    * Cyclomatic complexity density: ',   'cyclomaticDensity', 1, '%'],
         ['    * Halstead difficulty: ',             'halstead.difficulty'],
         ['    * Halstead volume: ',                 'halstead.volume'],
         ['    * Halstead effort: ',                 'halstead.effort', 0]
      );
   }

   /**
    * Formats a module reports methods array.
    *
    * @param {Array<MethodReport>}  methodReports - An array of MethodReport instances to format.
    *
    * @returns {string}
    * @private
    */
   _formatMethods(methodReports)
   {
      return methodReports.reduce((formatted, r) => { return `${formatted}\n${this._formatMethod(r)}`; }, '');
   }

   /**
    * Formats a module report.
    *
    * @param {ModuleReport}   report - A module report.
    * @param {boolean}        reportsAvailable - Indicates that the report metric data is available.
    *
    * @returns {string}
    * @private
    */
   _formatModule(report, reportsAvailable)
   {
      if (reportsAvailable)
      {
         return s_SAFE(report,
            ['## ', 'srcPath', 2],
            ['* Physical LOC: ',                   'aggregate.sloc.physical'],
            ['* Logical LOC: ',                    'aggregate.sloc.logical'],
            ['* Mean parameter count: ',           'params'],
            ['* Cyclomatic complexity: ',          'aggregate.cyclomatic'],
            ['* Cyclomatic complexity density: ',  'aggregate.cyclomaticDensity', 1, '%'],
            ['* Maintainability index: ',          'maintainability'],
            ['* Dependency count: ',               'dependencies.length', 0],
            this._formatMethods(report.methods)
         );
      }
      else
      {
         return `${report.srcPath}\n`;
      }
   }

   /**
    * Formats a project result.
    *
    * @param {ProjectResult}  result - A project result.
    *
    * @returns {string}
    * @private
    */
   _formatProject(result)
   {
      return s_SAFE(result,
         '# Complexity report\n\n',
         ['* Mean per-function logical LOC: ',           'loc'],
         ['* Mean per-function parameter count: ',       'params'],
         ['* Mean per-function cyclomatic complexity: ', 'cyclomatic'],
         ['* Mean per-function Halstead effort: ',       'effort'],
         ['* Mean per-module maintainability index: ',   'maintainability'],
         ['* First-order density: ',                     'firstOrderDensity', 1, '%'],
         ['* Change cost: ',                             'changeCost', 1, '%'],
         ['* Core size: ',                               'coreSize', 2, '%']
      );
   }
}