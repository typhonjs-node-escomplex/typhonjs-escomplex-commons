import StringUtil from '../../../utils/StringUtil';

/**
 * Provides a format transform for ModuleReport / ProjectResult instances converting them to plain text with just
 * modules.
 */
export default class FormatTextModules
{
   constructor(header = s_DEFAULT_HEADER)
   {
      this._header = header;
   }

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
      let output = '';

      // Add / remove a temporary entries for the current module index.
      try
      {
         report.___modulecntr___ = 0;
         report.___modulecntrplus1___ = 1;

         output = StringUtil.safeStringsObject(report, ...this._header.moduleReport);
      }
      finally
      {
         delete report.___modulecntr___;
         delete report.___modulecntrplus1___;
      }

      return output;
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
      return result.reports.reduce((formatted, moduleReport, index) =>
      {
         let current = '';

         // Add / remove a temporary entries for the current module index.
         try
         {
            moduleReport.___modulecntr___ = index;
            moduleReport.___modulecntrplus1___ = index + 1;

            current = `${formatted}${StringUtil.safeStringsObject(moduleReport, ...this._header.moduleReport)}\n`;
         }
         finally
         {
            delete moduleReport.___modulecntr___;
            delete moduleReport.___modulecntrplus1___;
         }

         return current;
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

// Module private ---------------------------------------------------------------------------------------------------

/**
 *
 * @type {{moduleReport: *[]}}
 */
const s_DEFAULT_HEADER =
{
   moduleReport:
   [
      ['Module ', '___modulecntrplus1___', 1, ':'],
      ['filePath: ', 'filePath'],
      ['srcPath: ', 'srcPath'],
      ['srcPathAlias: ', 'srcPathAlias']
   ]
};