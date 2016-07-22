import AbstractFormatText  from './AbstractFormatText';
import TransformFormat     from '../../TransformFormat';

/**
 * Provides a format transform for ModuleReport / ProjectResult instances converting them to plain text.
 */
export default class FormatText extends AbstractFormatText
{
   constructor(headers = {}, keys = {}, adjacencyFormatName = 'text-adjacency',
    visibilityFormatName = 'text-visibility')
   {
      super(Object.assign(Object.assign({}, s_DEFAULT_HEADERS), headers),
       Object.assign(Object.assign({}, s_DEFAULT_KEYS), keys));

      this._adjacencyFormatName = adjacencyFormatName;
      this._visibilityFormatName = visibilityFormatName;
   }

   /**
    * Formats a project result as plain text.
    *
    * @param {ProjectResult}  result - A project result.
    *
    * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
    * @property {string}      classReport - An entry key found in the ClassReport to output.
    * @property {string}      methodReport - An entry key found in the MethodReport to output.
    * @property {string}      moduleReport - An entry key found in the ModuleReport to output.
    *
    * @returns {string}
    */
   formatResult(result, options = {})
   {
      let output = super.formatResult(result, options);

      let localOptions = Object.assign({}, this._keys);
      localOptions = Object.assign(localOptions, options);

      const adjacency = typeof localOptions.adjacency === 'boolean' ? localOptions.adjacency : true;
      const visibility = typeof localOptions.visibility === 'boolean' ? localOptions.visibility : true;

      // Add adjacency matrix output
      if (adjacency && TransformFormat.isFormat(this._adjacencyFormatName))
      {
         output += `\n\n${TransformFormat.format(result, this._adjacencyFormatName, options)}`;
      }

      // Add visibility matrix output
      if (visibility && TransformFormat.isFormat(this._visibilityFormatName))
      {
         output += `\n\n${TransformFormat.format(result, this._visibilityFormatName, options)}`;
      }

      return output;
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