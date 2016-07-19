import StringUtil from '../../../utils/StringUtil';

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
    * Gets the format name.
    *
    * @returns {string}
    */
   get name()
   {
      return 'text';
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
      return StringUtil.safeStringsObject(methodReport,
         '\n',
         ['  Function: ',                          'name'],
         ['    Line start: ',                      'lineStart'],
         ['    Line end: ',                        'lineEnd'],
         ['    Physical LOC: ',                    'sloc.physical'],
         ['    Logical LOC: ',                     'sloc.logical'],
         ['    Parameter count: ',                 'params'],
         ['    Cyclomatic complexity: ',           'cyclomatic'],
         ['    Cyclomatic complexity density: ',   'cyclomaticDensity', 1, '%'],
         ['    Halstead difficulty: ',             'halstead.difficulty'],
         ['    Halstead volume: ',                 'halstead.volume'],
         ['    Halstead effort: ',                 'halstead.effort', 0]
      );
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
         return StringUtil.safeStringsObject(report,
            ['',                                   'srcPath', 2],
            ['  Physical LOC: ',                   'aggregate.sloc.physical'],
            ['  Logical LOC: ',                    'aggregate.sloc.logical'],
            ['  Mean parameter count: ',           'params'],
            ['  Cyclomatic complexity: ',          'aggregate.cyclomatic'],
            ['  Cyclomatic complexity density: ',  'aggregate.cyclomaticDensity', 1, '%'],
            ['  Maintainability index: ',          'maintainability'],
            ['  Dependency count: ',               'dependencies.length', 0],
            this._formatMethods(report.methods)
         );
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
      return StringUtil.safeStringsObject(result,
         ['Mean per-function logical LOC: ',             'loc'],
         ['Mean per-function parameter count: ',         'params'],
         ['Mean per-function cyclomatic complexity: ',   'cyclomatic'],
         ['Mean per-function Halstead effort: ',         'effort'],
         ['Mean per-module maintainability index: ',     'maintainability'],
         ['First-order density: ',                       'firstOrderDensity', 1, '%'],
         ['Change cost: ',                               'changeCost', 1, '%'],
         ['Core size: ',                                 'coreSize', 2, '%']
      );
   }
}