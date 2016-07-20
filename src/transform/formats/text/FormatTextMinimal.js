import StringUtil from '../../../utils/StringUtil';

/**
 * Provides a format transform for ESComplex ModuleReport / ProjectResult instances converting them to plain text with
 * minimal metrics.
 */
export default class FormatTextMinimal
{
   constructor(headers = s_DEFAULT_HEADERS)
   {
      this._headers = headers;
   }

   /**
    * Formats a module report as minimal / plain text.
    *
    * @param {ModuleReport}   report - A module report.
    *
    * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
    * @property {string}      classReport - An entry key found in the ClassReport to output.
    * @property {string}      methodReport - An entry key found in the MethodReport to output.
    * @property {string}      moduleReport - An entry key found in the ModuleReport to output.
    *
    * @returns {string}
    */
   formatReport(report, options = s_DEFAULT_KEYS)
   {
      let output = '';

      // Add / remove a temporary entries for the current module index.
      try
      {
         report.___modulecntr___ = 0;
         report.___modulecntrplus1___ = 1;

         output = this._formatModule(report, true, options);
      }
      finally
      {
         delete report.___modulecntr___;
         delete report.___modulecntrplus1___;
      }

      return output;
   }

   /**
    * Formats a project result as minimal / plain text.
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
   formatResult(result, options = s_DEFAULT_KEYS)
   {
      const reportsAvailable = result.getSetting('serializeReports', false);

      return result.reports.reduce((formatted, moduleReport, index) =>
      {
         let current = '';

         // Add / remove a temporary entries for the current module index.
         try
         {
            moduleReport.___modulecntr___ = index;
            moduleReport.___modulecntrplus1___ = index + 1;

            current = `${formatted}${this._formatModule(moduleReport, reportsAvailable, options)}\n\n`;
         }
         finally
         {
            delete moduleReport.___modulecntr___;
            delete moduleReport.___modulecntrplus1___;
         }

         return current;
      }, `${this._formatProject(result, options)}\n\n`);
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

   /**
    * Formats a class report.
    *
    * @param {ClassReport} classReport - A class report.
    *
    * @param {object}      options - (Optional) One or more optional parameters passed to the formatter.
    * @property {string}   classReport - An entry key found in the ClassReport to output.
    * @property {string}   methodReport - An entry key found in the MethodReport to output.
    *
    * @param {string}      prepend - (Optional) A string to prepend; default: `''`.
    *
    * @returns {string}
    */
   _formatClass(classReport, options, prepend = '')
   {
      return StringUtil.safeStringsObject(classReport,
         ...this._headers.classReport,
         this._formatEntries(classReport, options.classReport, `${prepend}   `),
         this._formatMethods(classReport.methods, options, `${prepend}   `, false)
      );
   }

   /**
    * Formats a module reports methods array.
    *
    * @param {Array<ClassReport>}   classReports - An array of ClassReport instances to format.
    *
    * @param {object}               options - (Optional) One or more optional parameters passed to the formatter.
    * @property {string}            classReport - An entry key found in the ClassReport to output.
    * @property {string}            methodReport - An entry key found in the MethodReport to output.
    *
    * @param {string}               prepend - (Optional) A string to prepend; default: `''`.
    *
    * @returns {string}
    */
   _formatClasses(classReports, options, prepend = '')
   {
      return classReports.reduce((formatted, r) =>
      {
         return `${formatted}\n${prepend}${this._formatClass(r, options, prepend)}`;
      }, '');
   }

   /**
    * Formats a class report.
    *
    * @param {object}         report - A class / method report.
    *
    * @param {Array<string>}  entries - (Optional) One or more optional entries to format.
    *
    * @param {string}         prepend - (Optional) A string to prepend; default: `''`.
    *
    * @returns {string}
    */
   _formatEntries(report, entries, prepend = '')
   {
      if (!Array.isArray(entries)) { return ''; }

      return entries.reduce((formatted, entry) =>
      {
         return typeof entry === 'string' ?
          `${formatted}\n${StringUtil.safeStringObject(`${prepend}${this._headers.entryPrepend}${entry}: `,
           report, entry, 0)}` : formatted;
      }, '');
   }

   /**
    * Formats a method report.
    *
    * @param {MethodReport}   methodReport - A method report.
    *
    * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
    * @property {string}      methodReport - An entry key found in the MethodReport to output.
    *
    * @param {string}         prepend - (Optional) A string to prepend; default: `''`.
    *
    * @param {boolean}        isModule - (Optional) Indicates module scope; default: `true`.
    *
    * @returns {string}
    */
   _formatMethod(methodReport, options, prepend = '', isModule = true)
   {
      return StringUtil.safeStringsObject(methodReport,
         ...(isModule ? this._headers.moduleMethod : this._headers.classMethod),
         this._formatEntries(methodReport, options.methodReport, `${prepend}   `)
      );
   }

   /**
    * Formats a module reports methods array.
    *
    * @param {Array<MethodReport>}  methodReports - An array of MethodReport instances to format.
    *
    * @param {object}               options - (Optional) One or more optional parameters passed to the formatter.
    * @property {string}            methodReport - An entry key found in the MethodReport to output.
    *
    * @param {string}               prepend - (Optional) A string to prepend; default: `''`.
    *
    * @param {boolean}              isModule - (Optional) Indicates module scope; default: `true`.
    *
    * @returns {string}
    */
   _formatMethods(methodReports, options, prepend = '', isModule = true)
   {
      return methodReports.reduce((formatted, r) =>
      {
         return `${formatted}\n${prepend}${this._formatMethod(r, options, prepend, isModule)}`;
      }, '');
   }

   /**
    * Formats a module report.
    *
    * @param {ModuleReport}   moduleReport - A module report.
    *
    * @param {boolean}        reportsAvailable - Indicates that the report metric data is available.
    *
    * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
    * @property {string}      classReport - An entry key found in the ClassReport to output.
    * @property {string}      methodReport - An entry key found in the MethodReport to output.
    * @property {string}      moduleReport - An entry key found in the ModuleReport to output.
    *
    * @returns {string}
    */
   _formatModule(moduleReport, reportsAvailable, options)
   {
      if (reportsAvailable)
      {
         return StringUtil.safeStringsObject(moduleReport,
            ...this._headers.moduleReport,
            this._formatEntries(moduleReport, options.moduleReport, '   '),
            this._formatMethods(moduleReport.methods, options, '   ', true),
            this._formatClasses(moduleReport.classes, options, '   ')
         );
      }
      else
      {
         return StringUtil.safeStringsObject(moduleReport, ...this._headers.moduleReport);
      }
   }

   _formatProject(projectReport, options)
   {
      return StringUtil.safeStringsObject(projectReport,
         ...this._headers.projectReport,
         this._formatEntries(projectReport, options.projectReport, '   ')
      );
   }
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Defines the default keys to include in a minimal text representation of module / project results.
 * @type {{classReport: string[], methodReport: string[], moduleReport: string[]}}
 * @ignore
 */
const s_DEFAULT_KEYS =
{
   classReport: ['maintainability'],
   methodReport: ['cyclomatic', 'halstead.difficulty'],
   moduleReport: ['maintainability'],
   projectReport: ['maintainability']
};

/**
 * Defines the default headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 * @type {{classMethod: *[], classReport: *[], moduleMethod: *[], moduleReport: *[]}}
 */
const s_DEFAULT_HEADERS =
{
   classMethod:
   [
      ['Class method: ', 'name', 0],
      [' (', 'lineStart', 0, ')']
   ],

   classReport:
   [
      ['Class: ', 'name', 0],
      [' (', 'lineStart', 0, ')']
   ],

   entryPrepend: '',

   moduleMethod:
   [
      ['Module method: ', 'name', 0],
      [' (', 'lineStart', 0, ')']
   ],

   moduleReport:
   [
      ['Module ', '___modulecntrplus1___', 0, ':'],
      ['\n   filePath: ', 'filePath', 0],
      ['\n   srcPath: ', 'srcPath', 0],
      ['\n   srcPathAlias: ', 'srcPathAlias', 0]
   ],

   projectReport:
   [
      'Project:'
   ]
};