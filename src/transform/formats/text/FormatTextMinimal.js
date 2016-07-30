import AbstractFormatTest  from './AbstractFormatText';
import ReportType          from '../../../types/ReportType';

/**
 * Provides a format transform for ModuleReport / ProjectResult instances converting them to plain text with just
 * modules.
 */
export default class FormatTextMinimal extends AbstractFormatTest
{
   constructor(headers = {}, keys = {})
   {
      super(Object.assign(Object.assign({}, s_DEFAULT_HEADERS), headers),
       Object.assign(Object.assign({}, s_DEFAULT_KEYS), keys));
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
      return 'text-minimal';
   }

   /**
    * Gets the format type.
    *
    * @returns {string}
    */
   get type()
   {
      return 'minimal';
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
         case ReportType.CLASS:
         case ReportType.CLASS_METHOD:
         case ReportType.MODULE_METHOD:
         case ReportType.MODULE:
         case ReportType.PROJECT:
            return true;

         default:
            return false;
      }
   }
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Defines the default keys to include in a minimal text representation of module / project results.
 * @type {{classReport: string[], methodReport: string[], moduleReport: string[], projectResult: string[]}}
 * @ignore
 */
const s_DEFAULT_KEYS =
{
   classReport: ['maintainability'],
   methodReport: ['cyclomatic', 'halstead.difficulty'],
   moduleReport: ['maintainability'],
   projectResult: ['moduleAverage.maintainability']
};

/**
 * Defines the default headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 * @type {{classMethod: *[], classReport: *[], entryPrepend: string, moduleMethod: *[], moduleReport: *[], projectResult: string[]}}
 * @ignore
 */
const s_DEFAULT_HEADERS =
{
   classMethod:
   [
      ['Class method: ', 'name', 0],
      [' (', 'lineStart', 1, ')']
   ],

   classReport:
   [
      ['Class: ', 'name', 0],
      [' (', 'lineStart', 1, ')']
   ],

   entryPrepend: '',

   moduleMethod:
   [
      ['Module method: ', 'name', 0],
      [' (', 'lineStart', 1, ')']
   ],

   moduleReport:
   [
      '\n',
      ['Module ', '___modulecntrplus1___', 1, ':'],
      ['   filePath: ', 'filePath', 1],
      ['   srcPath: ', 'srcPath', 1],
      ['   srcPathAlias: ', 'srcPathAlias', 1]
   ],

   projectResult:
   [
      'Project:\n'
   ]
};
