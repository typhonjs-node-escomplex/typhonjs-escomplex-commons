import AbstractFormatTest  from './AbstractFormatText';

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
   projectResult: ['maintainability']
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
