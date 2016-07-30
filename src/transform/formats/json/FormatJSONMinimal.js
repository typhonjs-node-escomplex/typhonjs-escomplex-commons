import ObjectUtil from '../../../utils/ObjectUtil';
import ReportType from '../../../types/ReportType';

/**
 * Provides a format transform for ESComplex ModuleReport / ProjectResult instances converting them to JSON with
 * minimal metrics.
 */
export default class FormatJSONMinimal
{
   constructor(keys = s_DEFAULT_KEYS)
   {
      this._keys = keys;
   }

   /**
    * Formats a report as a JSON string with minimal metrics.
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
      switch (report.type)
      {
         case ReportType.CLASS:
            break;

         case ReportType.CLASS_METHOD:
         case ReportType.MODULE_METHOD:
            break;

         case ReportType.MODULE:
            return this.formatModule(report, options);

         case ReportType.PROJECT:
            return this.formatProject(report, options);

         default:
            console.warn(`formatReport '${this.name}' warning: unsupported report type '${report.type}'.`);
            return '';
      }
   }

   /**
    * Formats a module report as a JSON string.
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
   formatModule(report, options = {})
   {
      let localOptions = Object.assign({}, this._keys);
      localOptions = Object.assign(localOptions, options);

      const output = this._formatModule(report, true, localOptions);

      return typeof localOptions === 'object' && Number.isInteger(localOptions.spacing) ?
       JSON.stringify(output, void 0, localOptions.spacing) : JSON.stringify(output);
   }

   /**
    * Formats a project result as minimal / plain text.
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
      let localOptions = Object.assign({}, this._keys);
      localOptions = Object.assign(localOptions, options);

      const output = { modules: [] };

      const reportsAvailable = result.getSetting('serializeReports', false);

      result.reports.forEach((report) =>
      {
         output.modules.push(this._formatModule(report, reportsAvailable, localOptions));
      });

      return typeof localOptions === 'object' && Number.isInteger(localOptions.spacing) ?
       JSON.stringify(output, void 0, localOptions.spacing) : JSON.stringify(output);
   }

   /**
    * Gets the file extension.
    *
    * @returns {string}
    */
   get extension()
   {
      return 'json';
   }

   /**
    * Gets the format name.
    *
    * @returns {string}
    */
   get name()
   {
      return 'json-minimal';
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
    * Returns whether a given ReportType is supported by this format transform.
    *
    * @param {ReportType}  reportType - A given report type.
    *
    * @returns {boolean}
    */
   isSupported(reportType)
   {
      switch (reportType)
      {
         case ReportType.CLASS:
         case ReportType.CLASS_METHOD:
         case ReportType.MODULE_METHOD:
         case ReportType.MODULE:
         case ReportType.PROJECT:
            return true;

         default:
            return false;
      }
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
    * @returns {Array<object>}
    */
   _formatClasses(classReports, options)
   {
      const output = [];

      classReports.forEach((classReport) =>
      {
         const entry = {};

         if (classReport.name) { entry.name = classReport.name; }
         if (classReport.lineStart) { entry.lineStart = classReport.lineStart; }

         if (Array.isArray(options.classReport))
         {
            options.classReport.forEach((classEntry) =>
            {
               const entryValue = ObjectUtil.safeAccess(classReport, classEntry);
               if (entryValue) { entry[classEntry] = entryValue; }
            });
         }

         entry.methods = this._formatMethods(classReport.methods, options);

         output.push(entry);
      });

      return output;
   }

   /**
    * Formats a module or class reports methods array.
    *
    * @param {Array<ClassMethodReport|ModuleMethodReport>}  methodReports - An array of method report instances to
    *                                                                       format.
    *
    * @param {object}               options - (Optional) One or more optional parameters passed to the formatter.
    * @property {string}            methodReport - An entry key found in the method report to output.
    *
    * @returns {Array<object>}
    */
   _formatMethods(methodReports, options)
   {
      const output = [];

      methodReports.forEach((methodReport) =>
      {
         const entry = {};

         if (methodReport.name) { entry.name = methodReport.name; }
         if (methodReport.lineStart) { entry.lineStart = methodReport.lineStart; }

         if (Array.isArray(options.methodReport))
         {
            options.methodReport.forEach((methodEntry) =>
            {
               const entryValue = ObjectUtil.safeAccess(methodReport, methodEntry);
               if (entryValue) { entry[methodEntry] = entryValue; }
            });
         }

         output.push(entry);
      });

      return output;
   }

   /**
    * Formats a module report.
    *
    * @param {ModuleReport}   report - A module report.
    *
    * @param {boolean}        reportsAvailable - Indicates that the report metric data is available.
    *
    * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
    * @property {string}      classReport - An entry key found in the class report to output.
    * @property {string}      methodReport - An entry key found in the method report to output.
    * @property {string}      moduleReport - An entry key found in the module report to output.
    *
    * @returns {object}
    */
   _formatModule(report, reportsAvailable, options)
   {
      const output = {};

      if (reportsAvailable)
      {
         if (report.filePath) { output.filePath = report.filePath; }
         if (report.srcPath) { output.srcPath = report.srcPath; }
         if (report.srcPathAlias) { output.srcPathAlias = report.srcPathAlias; }

         if (Array.isArray(options.moduleReport))
         {
            options.moduleReport.forEach((moduleEntry) =>
            {
               const entryValue = ObjectUtil.safeAccess(report, moduleEntry);
               if (entryValue) { output[moduleEntry] = entryValue; }
            });
         }

         output.classes = this._formatClasses(report.classes, options);
         output.methods = this._formatMethods(report.methods, options);
      }
      else
      {
         if (report.filePath) { output.filePath = report.filePath; }
         if (report.srcPath) { output.srcPath = report.srcPath; }
         if (report.srcPathAlias) { output.srcPathAlias = report.srcPathAlias; }

         output.classes = [];
         output.methods = [];
      }

      return output;
   }
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Defines the default keys to include in a minimal JSON representation of module / project results.
 * @type {{classReport: string[], methodReport: string[], moduleReport: string[]}}
 * @ignore
 */
const s_DEFAULT_KEYS =
{
   classReport: ['maintainability'],
   methodReport: ['cyclomatic', 'halstead.difficulty'],
   moduleReport: ['maintainability']
};
