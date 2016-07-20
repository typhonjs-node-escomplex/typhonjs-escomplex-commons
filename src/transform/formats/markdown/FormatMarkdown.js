import FormatText from '../text/FormatText';
import StringUtil from '../../../utils/StringUtil';

/**
 * Provides a format transform for ModuleReport / ProjectResult instances converting them to a markdown string.
 */
export default class FormatMarkdown extends FormatText
{
   constructor()
   {
      super(s_DEFAULT_HEADERS);
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
}

/**
 * Defines the default headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 * @type {{classMethod: *[], classReport: *[], moduleMethod: *[], moduleReport: *[]}}
 */
const s_DEFAULT_HEADERS =
{
   classMethod:
   [
      '\n',
      ['* Class method: **', 'name', 1, '**', StringUtil.tagEscapeHTML]
   ],

   classReport:
   [
      '\n',
      ['* Class: **', 'name', 1, '**', StringUtil.tagEscapeHTML]
   ],

   entryPrepend: '* ',

   moduleMethod:
   [
      '\n',
      ['* Module method: **', 'name', 1, '**', StringUtil.tagEscapeHTML]
   ],

   moduleReport:
   [
      '\n',
      '* Module: \n',
      ['   * File path: `',       'filePath', 1, '`'],
      ['   * Source path: `',     'srcPath', 1, '`'],
      ['   * Source alias: `',    'srcPathAlias', 1, '`']
   ],

   projectResult:
   [
      '* Project: \n'
   ]
};