import FormatTextMinimal   from '../text/FormatTextMinimal';

import StringUtil          from '../../../utils/StringUtil';

/**
 * Provides a format transform for ModuleReport / ProjectResult instances converting them to markdown with
 * minimal metrics.
 */
export default class FormatMarkdownMinimal extends FormatTextMinimal
{
   constructor(headers = {}, keys = {})
   {
      super(Object.assign(Object.assign({}, s_DEFAULT_HEADERS), headers), keys);
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
 * Defines the default headers as markdown which are inserted via spread into `StringUtil.safeStringsObject`.
 * @type {{classMethod: *[], classReport: *[], entryPrepend: string, moduleMethod: *[], moduleReport: *[], projectResult: string[]}}
 * @ignore
 */
const s_DEFAULT_HEADERS =
{
   classMethod:
   [
      ['* Class method: **', 'name', 0, '', StringUtil.tagEscapeHTML],
      ['** (', 'lineStart', 1, ')']
   ],

   classReport:
   [
      ['* Class: **', 'name', 0, '', StringUtil.tagEscapeHTML],
      ['** (', 'lineStart', 1, ')']
   ],

   entryPrepend: '* ',

   entryTemplateTag: StringUtil.tagEscapeHTML,

   moduleMethod:
   [
      ['* Module method: **', 'name', 0, '', StringUtil.tagEscapeHTML],
      ['** (', 'lineStart', 1, ')']
   ],

   moduleReport:
   [
      '\n',
      ['* Module ', '___modulecntrplus1___', 1, ':'],
      ['   * filePath: `', 'filePath', 1, '`'],
      ['   * srcPath: `', 'srcPath', 1, '`'],
      ['   * srcPathAlias: `', 'srcPathAlias', 1, '`']
   ],

   projectResult:
   [
      '* Project:\n'
   ]
};
