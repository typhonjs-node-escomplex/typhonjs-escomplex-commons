import ObjectUtil from '../../../utils/ObjectUtil';
import StringUtil from '../../../utils/StringUtil';
import ReportType from '../../../types/ReportType';

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
    * Formats a report as plain text.
    *
    * @param {ClassReport|MethodReport|ModuleReport|ProjectResult} report - A report to format.
    *
    * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
    * @property {number}      spacing - (Optional) An integer defining the JSON output spacing.
    *
    * @returns {string}
    */
   formatReport(report, options = {})
   {
      let localOptions = Object.assign({}, this._keys);
      localOptions = Object.assign(localOptions, options);

      let output;

      switch (report.type)
      {
         case ReportType.CLASS:
            output = this._formatClass(report, localOptions).replace(/^[\n]/, '');
            break;

         case ReportType.CLASS_METHOD:
            output = this._formatMethod(report, localOptions, '', false).replace(/^[\n]/, '');
            break;

         case ReportType.MODULE_METHOD:
            output = this._formatMethod(report, localOptions).replace(/^[\n]/, '');
            break;

         case ReportType.MODULE:
            output = this._formatModule(report, localOptions);
            break;

         case ReportType.PROJECT:
            output = this._formatProject(report, localOptions);
            break;

         default:
            console.warn(`formatReport '${this.name}' warning: unsupported report type '${report.type}'.`);
            return '';
      }

      return output;
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
    * Formats entries for a given report.
    *
    * @param {object}         report - A class / method report.
    *
    * @param {Array<string>|Array<string>}  entries - (Optional) One or more optional entries to format.
    *
    * @param {string}         prepend - (Optional) A string to prepend; default: `''`.
    *
    * @param {string}         parentPrepend - (Optional) The parent prepend string used for entries that are arrays with
    *                                         more than one entry; default: `''`.
    *
    * @returns {string|Array<string>}
    * @private
    */
   _formatEntries(report, entries, prepend = '', parentPrepend = '')
   {
      if (!Array.isArray(entries)) { return ''; }

      const entryPrepend = typeof this._headers.entryPrepend === 'string' ? this._headers.entryPrepend : '';

      const entryTag = typeof this._headers.entryTemplateTag === 'function' ? this._headers.entryTemplateTag : void 0;

      const output = [];

      // Admittedly the following block is a bit obtuse.
      entries.forEach((entry) =>
      {
         const accessor = Array.isArray(entry) ? entry[1] : entry;
         let value = ObjectUtil.safeAccess(report, accessor);

         if (typeof value === 'undefined') { return; }

         // Convert all values to an array.
         value = Array.isArray(value) ? value : [value];

         let result = '';

         // Skip any arrays that have no entries.
         if (value.length > 0)
         {
            // Provides a temporary object to store each array entry via the given accessor.
            const temp = {};

            value.forEach((valueEntry, index) =>
            {
               // An array with more than one entry must add the parent prepend string to maintain alignment.
               if (index > 0) { result += parentPrepend; }

               if (Array.isArray(entry))
               {
                  // Store the entry via the given accessor.
                  ObjectUtil.safeSet(temp, accessor, valueEntry);

                  result += StringUtil.safeStringsPrependObject(`${prepend}${entryPrepend}`, temp, entry);
               }
               else if (typeof entry === 'string')
               {
                  result += `${prepend}${entryPrepend}${entry}: ${valueEntry}\n`;
               }
            });
         }

         // Apply entry template tag if it is defined.
         result = entryTag ? entryTag`${result}` : result;

         if (result !== '') { output.push(result); }
      });

      return output;
   }

   /**
    * Formats a method report.
    *
    * @param {MethodReport}   methodReport - A method report.
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
         ...this._formatEntries(methodReport, options.methodReport, indent, prepend)
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
    * @private
    */
   _formatModule(report, options)
   {
      let output = '';

      // Add / remove a temporary entries for the current module index.
      try
      {
         report.___modulecntr___ = 0;
         report.___modulecntrplus1___ = 1;

         output = this._formatModuleReport(report, true, options);
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
   _formatModuleReport(moduleReport, reportsAvailable, options)
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
    * @protected
    */
   _formatProject(result, options)
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

            current = `${formatted}${this._formatModuleReport(moduleReport, reportsAvailable, options)}`;
         }
         finally
         {
            delete moduleReport.___modulecntr___;
            delete moduleReport.___modulecntrplus1___;
         }

         return current;
      }, `${this._formatProjectReport(result, options)}`);
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
   _formatProjectReport(projectResult, options)
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