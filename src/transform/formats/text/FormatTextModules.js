import StringUtil from '../../../utils/StringUtil';

/**
 * Provides a format transform for ESComplex ProjectResult instances converting them to plain text with just modules.
 */
export default class FormatTextModules
{
   /**
    * Formats a module report as plain text just including `filePath`, `srcPath`, `srcPathAlias` if defined. Please
    * note that this only works for ModuleReports defined in a ProjectResult.
    *
    * @param {ModuleReport}   report - A module report.
    *
    * @returns {string}
    */
   formatReport(report)
   {
      return StringUtil.safeStringsObject(report,
         'Module:\n',
         ['filePath: ', 'filePath'],
         ['srcPath: ', 'srcPath'],
         ['srcPathAlias: ', 'srcPathAlias']
      );
   }

   /**
    * Formats a project result modules as plain text just including `filePath`, `srcPath`, `srcPathAlias` if defined.
    *
    * @param {ProjectResult}  result - A project result.
    *
    * @returns {string}
    */
   formatResult(result)
   {
      return result.reports.reduce((formatted, moduleReport) =>
      {
         const entry = StringUtil.safeStringsObject(moduleReport,
            'Module:\n',
            ['filePath: ', 'filePath'],
            ['srcPath: ', 'srcPath'],
            ['srcPathAlias: ', 'srcPathAlias']
         );

         return `${formatted}${entry}\n`;
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
    * Gets the format name.
    *
    * @returns {string}
    */
   get name()
   {
      return 'text-modules';
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