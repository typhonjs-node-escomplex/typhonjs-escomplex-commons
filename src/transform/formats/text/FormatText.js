import AbstractFormatText from './AbstractFormatText';

/**
 * Provides a format transform for ModuleReport / ProjectResult instances converting them to plain text.
 */
export default class FormatText extends AbstractFormatText
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
      return 'text';
   }

   /**
    * Gets the format type.
    *
    * @returns {string}
    */
   get type()
   {
      return 'text';
   }
}

// Module private ---------------------------------------------------------------------------------------------------

const s_SHARED_DATA =
[
   ['Line start: ',                      'lineStart'],
   ['Line end: ',                        'lineEnd'],
   ['Physical LOC: ',                    'sloc.physical'],
   ['Logical LOC: ',                     'sloc.logical'],
   ['Cyclomatic complexity: ',           'cyclomatic'],
   ['Cyclomatic complexity density: ',   'cyclomaticDensity', 1, '%'],
   ['Halstead difficulty: ',             'halstead.difficulty'],
   ['Halstead volume: ',                 'halstead.volume'],
   ['Halstead effort: ',                 'halstead.effort']
];

/**
 * Defines the default headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 * @type {{classMethod: *[], classReport: *[], moduleMethod: *[], moduleReport: *[]}}
 */
const s_DEFAULT_KEYS =
{
   classMethod:
   [
      ...s_SHARED_DATA
   ],

   classReport:
   [
      ...s_SHARED_DATA
   ],

   methodReport:
   [
      ...s_SHARED_DATA,
      ['Parameter count: ', 'params']
   ],

   moduleReport:
   [
      ...s_SHARED_DATA,
      ['Maintainability index: ', 'maintainability'],
      ['Dependency count: ', 'dependencies.length']
   ],

   projectResult:
   [
      ['Mean per-function logical LOC: ',             'loc'],
      ['Mean per-function parameter count: ',         'params'],
      ['Mean per-function cyclomatic complexity: ',   'cyclomatic'],
      ['Mean per-function Halstead effort: ',         'effort'],
      ['Mean per-module maintainability index: ',     'maintainability'],
      ['First-order density: ',                       'firstOrderDensity', 1, '%'],
      ['Change cost: ',                               'changeCost', 1, '%'],
      ['Core size: ',                                 'coreSize', 1, '%']
   ]
};

/**
 * Defines the default headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 * @type {{classMethod: *[], classReport: *[], entryPrepend: string, moduleMethod: *[], moduleReport: string[], projectResult: string[]}}
 */
const s_DEFAULT_HEADERS =
{
   classMethod:
   [
      '\n',
      ['Class method: ', 'name']
   ],

   classReport:
   [
      '\n',
      ['Class: ', 'name']
   ],

   entryPrepend: '',

   moduleMethod:
   [
      '\n',
      ['Module method: ', 'name']
   ],

   moduleReport:
   [
      '\n',
      ['Module ', '___modulecntrplus1___', 1, ':'],
      ['   File path: ',       'filePath'],
      ['   Source path: ',     'srcPath'],
      ['   Source alias: ',    'srcPathAlias']
   ],

   projectResult:
   [
      'Project: \n'
   ]
};