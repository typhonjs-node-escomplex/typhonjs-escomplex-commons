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
    * @property {string}      classReport - An entry key found in the class report to output.
    * @property {string}      methodReport - An entry key found in the method report to output.
    * @property {string}      moduleReport - An entry key found in the module report to output.
    *
    * @returns {string}
    */
   formatProject(result, options = {})
   {
      let output = super.formatProject(result, options);

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
      return 'full';
   }
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Provides shared method data.
 * @type {*[]}
 * @ignore
 */
const s_SHARED_METHOD_DATA =
[
   ['Line start: ',                          'lineStart'],
   ['Line end: ',                            'lineEnd'],
   ['Physical LOC: ',                        'sloc.physical'],
   ['Logical LOC: ',                         'sloc.logical'],
   ['Cyclomatic complexity: ',               'cyclomatic'],
   ['Cyclomatic complexity density: ',       'cyclomaticDensity', 1, '%'],
   ['Halstead difficulty: ',                 'halstead.difficulty'],
   ['Halstead volume: ',                     'halstead.volume'],
   ['Halstead effort: ',                     'halstead.effort'],
   ['Parameter count: ',                     'params']
];

/**
 * Provides shared average method data.
 * @type {*[]}
 * @ignore
 */
const s_SHARED_METHOD_AVERAGE_DATA =
[
   ['Average per-function physical LOC: ',            'methodAverage.sloc.physical'],
   ['Average per-function logical LOC: ',             'methodAverage.sloc.logical'],
   ['Average per-function cyclomatic complexity: ',   'methodAverage.cyclomatic'],
   ['Average per-function cyclomatic density: ',      'methodAverage.cyclomaticDensity', 1, '%'],
   ['Average per-function halstead difficulty: ',     'methodAverage.halstead.difficulty'],
   ['Average per-function halstead volume: ',         'methodAverage.halstead.volume'],
   ['Average per-function halstead effort: ',         'methodAverage.halstead.effort']
];

/**
 * Defines the default headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 * @type {{classMethod: Array, classReport: Array, methodReport: *[], moduleReport: *[], projectResult: *[]}}
 * @ignore
 */
const s_DEFAULT_KEYS =
{
   classMethod:
   [
      ...s_SHARED_METHOD_DATA
   ],

   classReport:
   [
      ['Line start: ',                 'lineStart'],
      ['Line end: ',                   'lineEnd'],
      ...s_SHARED_METHOD_AVERAGE_DATA
   ],

   methodReport:
   [
      ...s_SHARED_METHOD_DATA
   ],

   moduleReport:
   [
      ['Total lines: ',                'lineEnd'],
      ['Maintainability index: ',      'maintainability'],
      ['Dependency count: ',           'dependencies.length'],
      ...s_SHARED_METHOD_AVERAGE_DATA
   ],

   projectResult:
   [
      ['First-order density: ',                          'firstOrderDensity', 1, '%'],
      ['Change cost: ',                                  'changeCost', 1, '%'],
      ['Core size: ',                                    'coreSize', 1, '%'],
      ['Average per-module maintainability index: ',     'moduleAverage.maintainability'],
      ['Average per-function physical LOC: ',            'moduleAverage.methodAverage.sloc.physical'],
      ['Average per-function logical LOC: ',             'moduleAverage.methodAverage.sloc.logical'],
      ['Average per-function parameter count: ',         'moduleAverage.methodAverage.params'],
      ['Average per-function cyclomatic complexity: ',   'moduleAverage.methodAverage.cyclomatic'],
      ['Average per-function halstead difficulty: ',     'moduleAverage.methodAverage.halstead.difficulty'],
      ['Average per-function halstead effort: ',         'moduleAverage.methodAverage.halstead.effort']
   ]
};

/**
 * Defines the default headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 * @type {{classMethod: *[], classReport: *[], entryPrepend: string, moduleMethod: *[], moduleReport: string[], projectResult: string[]}}
 * @ignore
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