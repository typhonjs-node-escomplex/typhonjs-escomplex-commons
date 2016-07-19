import FormatTextMinimal   from '../text/FormatTextMinimal';

import StringUtil          from '../../../utils/StringUtil';

/**
 * Provides a format transform for ModuleReport / ProjectResult instances converting them to markdown with
 * minimal metrics.
 */
export default class FormatMarkdownMinimal extends FormatTextMinimal
{
   constructor(headers = s_MARKDOWN_HEADERS)
   {
      super(headers);
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
      return 'markdown-minimal';
   }
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Defines markdown headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 * @type {{classMethod: *[], classReport: *[], moduleMethod: *[], moduleReport: *[]}}
 * @ignore
 */
const s_MARKDOWN_HEADERS =
{
   classMethod:
   [
      ['* Class method: **', 'name', 0, '**', StringUtil.tagEscapeHTML],
      [' (', 'lineStart', 0, ')']
   ],

   classReport:
   [
      ['* Class: **', 'name', 0, '**', StringUtil.tagEscapeHTML],
      [' (', 'lineStart', 0, ')']
   ],

   entryPrepend: '* ',

   moduleMethod:
   [
      ['* Module method: **', 'name', 0, '**', StringUtil.tagEscapeHTML],
      [' (', 'lineStart', 0, ')']
   ],

   moduleReport:
   [
      '* Module:',
      ['\n   * filePath: `', 'filePath', 0, '`'],
      ['\n   * srcPath: `', 'srcPath', 0, '`'],
      ['\n   * srcPathAlias: `', 'srcPathAlias', 0, '`']
   ]
};
