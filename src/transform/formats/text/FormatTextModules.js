import AbstractFormatTest  from './AbstractFormatText';

/**
 * Provides a format transform for ModuleReport / ProjectResult instances converting them to plain text with just
 * modules.
 */
export default class FormatTextModules extends AbstractFormatTest
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
 * Defines markdown headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 * @type {{moduleReport: *[]}}
 * @ignore
 */
const s_DEFAULT_HEADERS =
{
   moduleReport:
   [
      ['Module ', '___modulecntrplus1___', 1, ':'],
      ['filePath: ', 'filePath'],
      ['srcPath: ', 'srcPath'],
      ['srcPathAlias: ', 'srcPathAlias'],
      '\n'
   ]
};