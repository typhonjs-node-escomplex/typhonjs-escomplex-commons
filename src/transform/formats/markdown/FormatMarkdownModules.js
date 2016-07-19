import FormatTextModules   from '../text/FormatTextModules';

/**
 * Provides a format transform for ModuleReport / ProjectResult instances converting them to markdown with just modules.
 */
export default class FormatMarkdownModules extends FormatTextModules
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
      return 'markdown-modules';
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
   moduleReport:
   [
      ['* Module ', '___modulecntrplus1___', 1, ':'],
      ['   * filePath: `', 'filePath', 1, '`'],
      ['   * srcPath: `', 'srcPath', 1, '`'],
      ['   * srcPathAlias: `', 'srcPathAlias', 1, '`']
   ]
};
