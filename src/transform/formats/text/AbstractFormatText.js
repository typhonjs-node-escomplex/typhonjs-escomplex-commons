import StringUtil from '../../../utils/StringUtil';

/**
 * Provides the base text format transform for ModuleReport / ProjectResult instances.
 */
export default class AbstractFormatText
{
   constructor(headers = {}, keys = {})
   {
      this._headers = headers;
      this._keys = keys;
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
   formatReport(report, options = {})
   {
      let localOptions = Object.assign({}, this._keys);
      localOptions = Object.assign(localOptions, options);

      let output = '';

      // Add / remove a temporary entries for the current module index.
      try
      {
         report.___modulecntr___ = 0;
         report.___modulecntrplus1___ = 1;

         output = this._formatModule(report, true, localOptions);
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
   formatResult(result, options = {})
   {
      let localOptions = Object.assign({}, this._keys);
      localOptions = Object.assign(localOptions, options);

      const reportsAvailable = result.getSetting('serializeReports', false);

      return result.reports.reduce((formatted, moduleReport, index) =>
      {
         let current = '';

         // Add / remove a temporary entries for the current module index.
         try
         {
            moduleReport.___modulecntr___ = index;
            moduleReport.___modulecntrplus1___ = index + 1;

            current = `${formatted}${this._formatModule(moduleReport, reportsAvailable, localOptions)}`;
         }
         finally
         {
            delete moduleReport.___modulecntr___;
            delete moduleReport.___modulecntrplus1___;
         }

         return current;
      }, `${this._formatProject(result, localOptions)}`);
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
      const indent = typeof options.indent === 'boolean' && !options.indent ? '' : '   ';
      const indent2 = typeof options.indent === 'boolean' && !options.indent ? '' : '      ';

      return StringUtil.safeStringsPrependObject(prepend, classReport,
         ...this._headers.classReport,
         ...this._formatEntries(classReport, options.classReport, indent),
         this._formatMethods(classReport.methods, options, indent2, false)
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
         return `${formatted}${this._formatClass(r, options, prepend)}`;
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

      const output = [];

      entries.forEach((entry) =>
      {
         let value;

         if (Array.isArray(entry))
         {
            value = StringUtil.safeStringsPrependObject(`${prepend}${this._headers.entryPrepend}`, report, entry);
         }
         else if (typeof entry === 'string')
         {
            value = StringUtil.safeStringObject(`${prepend}${this._headers.entryPrepend}${entry}: `, report, entry, 0);
         }

         if (typeof value === 'string' && value !== '') { output.push(value); }
      });

      return output;
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
      const indent = typeof options.indent === 'boolean' && !options.indent ? '' : '   ';

      return StringUtil.safeStringsPrependObject(prepend, methodReport,
         ...(isModule ? this._headers.moduleMethod : this._headers.classMethod),
         ...this._formatEntries(methodReport, options.methodReport, indent)
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
      return methodReports.reduce((formatted, methodReport) =>
      {
         return `${formatted}${this._formatMethod(methodReport, options, prepend, isModule)}`;
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
      const indent = typeof options.indent === 'boolean' && !options.indent ? '' : '   ';

      if (reportsAvailable)
      {
         return StringUtil.safeStringsObject(moduleReport,
            ...this._headers.moduleReport,
            ...this._formatEntries(moduleReport, options.moduleReport, indent),
            this._formatMethods(moduleReport.methods, options, indent, true),
            this._formatClasses(moduleReport.classes, options, indent)
         );
      }
      else
      {
         return StringUtil.safeStringsObject(moduleReport, ...this._headers.moduleReport);
      }
   }

   _formatProject(projectResult, options)
   {
      const indent = typeof options.indent === 'boolean' && !options.indent ? '' : '   ';

      return StringUtil.safeStringsObject(projectResult,
         ...this._headers.projectResult,
         ...this._formatEntries(projectResult, options.projectResult, indent)
      );
   }
}