import StringUtil from '../../../utils/StringUtil';

/**
 * Provides the base text format transform for ModuleReport / ProjectResult instances.
 */
export default class AbstractFormatText
{
   /**
    * Initializes instance storing default headers / keys.
    *
    * @param {object}   headers - An object hash of header entries formatted for `StringUtil.safeStringsObject`.
    *
    * @param {object}   keys - An object hash of key entries formatted for `StringUtil.safeStringsObject`.
    */
   constructor(headers = {}, keys = {})
   {
      this._headers = headers;
      this._keys = keys;
   }

   /**
    * Formats a module report as plain text.
    *
    * @param {ModuleReport}   report - A module report.
    *
    * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
    * @property {string}      classReport - An entry key found in the class report to output.
    * @property {string}      methodReport - An entry key found in the method report to output.
    * @property {string}      moduleReport - An entry key found in the module report to output.
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

      // For reports remove any existing new line at the beginning.
      return output.replace(/^[\n]/, '');
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
    * @property {string}   classReport - An entry key found in the class report to output.
    * @property {string}   methodReport - An entry key found in the method report to output.
    *
    * @param {string}      prepend - (Optional) A string to prepend; default: `''`.
    *
    * @returns {string}
    * @private
    */
   _formatClass(classReport, options, prepend = '')
   {
      if (!Array.isArray(this._headers.classReport)) { return ''; }

      const indent = typeof options.indent === 'boolean' && !options.indent ? '' : '   ';
      const indent2 = typeof options.indent === 'boolean' && !options.indent ? '' : '      ';

      // Must concatenate class methods so that the initial prepend isn't displayed twice.
      return `${StringUtil.safeStringsPrependObject(prepend, classReport, ...this._headers.classReport,
       ...this._formatEntries(classReport, options.classReport, indent))}${this._formatMethods(
        classReport.methods, options, indent2, false)}`;
   }

   /**
    * Formats a module reports methods array.
    *
    * @param {Array<ClassReport>}   classReports - An array of ClassReport instances to format.
    *
    * @param {object}               options - (Optional) One or more optional parameters passed to the formatter.
    * @property {string}            classReport - An entry key found in the class report to output.
    * @property {string}            methodReport - An entry key found in the method report to output.
    *
    * @param {string}               prepend - (Optional) A string to prepend; default: `''`.
    *
    * @returns {string}
    * @private
    */
   _formatClasses(classReports, options, prepend = '')
   {
      if (!Array.isArray(classReports)) { return ''; }

      return classReports.reduce((formatted, classReport) =>
      {
         return `${formatted}${this._formatClass(classReport, options, prepend)}`;
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
    * @private
    */
   _formatEntries(report, entries, prepend = '')
   {
      if (!Array.isArray(entries)) { return ''; }

      const entryPrepend = typeof this._headers.entryPrepend === 'string' ? this._headers.entryPrepend : '';

      const output = [];

      entries.forEach((entry) =>
      {
         let value;

         if (Array.isArray(entry))
         {
            value = StringUtil.safeStringsPrependObject(`${prepend}${entryPrepend}`, report, entry);
         }
         else if (typeof entry === 'string')
         {
            value = StringUtil.safeStringObject(`${prepend}${entryPrepend}${entry}: `, report, entry, 1);
         }

         if (typeof value === 'string' && value !== '') { output.push(value); }
      });

      return output;
   }

   /**
    * Formats a method report.
    *
    * @param {ClassMethodReport|ModuleMethodReport}   methodReport - A method report.
    *
    * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
    * @property {string}      methodReport - An entry key found in the method report to output.
    *
    * @param {string}         prepend - (Optional) A string to prepend; default: `''`.
    *
    * @param {boolean}        isModule - (Optional) Indicates module scope; default: `true`.
    *
    * @returns {string}
    * @private
    */
   _formatMethod(methodReport, options, prepend = '', isModule = true)
   {
      // Skip processing if there are no headers.
      if (!Array.isArray(this._headers.classMethod) || !Array.isArray(this._headers.moduleMethod)) { return ''; }

      const indent = typeof options.indent === 'boolean' && !options.indent ? '' : '   ';

      return StringUtil.safeStringsPrependObject(prepend, methodReport,
         ...(isModule ? this._headers.moduleMethod : this._headers.classMethod),
         ...this._formatEntries(methodReport, options.methodReport, indent)
      );
   }

   /**
    * Formats a module reports methods array.
    *
    * @param {Array<ClassMethodReport|ClassMethodReport>}  methodReports - An array of method report instances to
    *                                                                      format.
    *
    * @param {object}               options - (Optional) One or more optional parameters passed to the formatter.
    * @property {string}            methodReport - An entry key found in the method report to output.
    *
    * @param {string}               prepend - (Optional) A string to prepend; default: `''`.
    *
    * @param {boolean}              isModule - (Optional) Indicates module scope; default: `true`.
    *
    * @returns {string}
    * @private
    */
   _formatMethods(methodReports, options, prepend = '', isModule = true)
   {
      if (!Array.isArray(methodReports)) { return ''; }

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
    * @property {string}      classReport - Entry keys found in the class report to output.
    * @property {string}      methodReport - Entry keys found in the method report to output.
    * @property {string}      moduleReport - Entry keys found in the module report to output.
    *
    * @returns {string}
    * @private
    */
   _formatModule(moduleReport, reportsAvailable, options)
   {
      // Skip processing if there are no headers.
      if (!Array.isArray(this._headers.moduleReport)) { return ''; }

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

   /**
    * Formats a project result.
    *
    * @param {ProjectResult}  projectResult - A project result.
    *
    * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
    * @property {string}      projectResult - Entry keys found in the ProjectReport to output.
    *
    * @returns {string}
    * @private
    */
   _formatProject(projectResult, options)
   {
      // Skip processing if there are no headers.
      if (!Array.isArray(this._headers.projectResult)) { return ''; }

      const indent = typeof options.indent === 'boolean' && !options.indent ? '' : '   ';

      return StringUtil.safeStringsObject(projectResult,
         ...this._headers.projectResult,
         ...this._formatEntries(projectResult, options.projectResult, indent)
      );
   }
}