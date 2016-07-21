import AbstractFormatText  from '../text/AbstractFormatText';

/**
 * Provides a format transform for ModuleReport / ProjectResult instances converting them to markdown with just modules.
 */
export default class FormatMarkdownModules extends AbstractFormatText
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
      return 'markdown-modules';
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
 * Defines markdown headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 * @type {{classMethod: *[], classReport: *[], moduleMethod: *[], moduleReport: *[]}}
 * @ignore
 */
const s_DEFAULT_HEADERS =
{
   moduleReport:
   [
      ['* Module ', '___modulecntrplus1___', 1, ':'],
      ['   * filePath: `', 'filePath', 1, '`'],
      ['   * srcPath: `', 'srcPath', 1, '`'],
      ['   * srcPathAlias: `', 'srcPathAlias', 1, '`'],
      '\n'
   ]
};
