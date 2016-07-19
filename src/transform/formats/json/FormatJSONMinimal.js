import ObjectUtil from '../../../utils/ObjectUtil';

/**
 * Defines the default keys to include in a minimal JSON representation of module / project results.
 * @type {{classReport: string[], methodReport: string[], moduleReport: string[]}}
 * @ignore
 */
const s_DEFAULT_KEYS =
{
   classReport: ['maintainability'],
   methodReport: ['cyclomatic', 'halstead.bugs'],
   moduleReport: ['maintainability']
};

/**
 * Provides a format transform for ESComplex ModuleReport / ProjectResult instances converting them to JSON with
 * minimal metrics.
 */
export default class FormatJSONMinimal
{
   /**
    * Formats a module report as a JSON string.
    *
    * @param {ModuleReport}   report - A module report.
    *
    * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
    * @property {string}      classReport - An entry key found in the ClassReport to output.
    * @property {string}      methodReport - An entry key found in the MethodReport to output.
    * @property {string}      moduleReport - An entry key found in the ModuleReport to output.
    *
    * @returns {object}
    */
   formatReport(report, options = s_DEFAULT_KEYS)
   {
      const output = this._formatModule(report, true, options);

      return typeof options === 'object' && Number.isInteger(options.spacing) ?
       JSON.stringify(output, undefined, options.spacing) : JSON.stringify(output);
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
      const output = { modules: [] };

      const reportsAvailable = result.getSetting('serializeReports', false);

      result.reports.forEach((report) =>
      {
         output.modules.push(this._formatModule(report, reportsAvailable, options));
      });

      return typeof options === 'object' && Number.isInteger(options.spacing) ?
       JSON.stringify(output, undefined, options.spacing) : JSON.stringify(output);
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
    * Formats a module reports methods array.
    *
    * @param {Array<ClassReport>}   classReports - An array of ClassReport instances to format.
    *
    * @param {object}               options - (Optional) One or more optional parameters passed to the formatter.
    * @property {string}            classReport - An entry key found in the ClassReport to output.
    * @property {string}            methodReport - An entry key found in the MethodReport to output.
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
    * @param {Array<MethodReport>}  methodReports - An array of MethodReport instances to format.
    *
    * @param {object}               options - (Optional) One or more optional parameters passed to the formatter.
    * @property {string}            methodReport - An entry key found in the MethodReport to output.
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

               //if (typeof methodEntry === 'string' && methodReport[methodEntry])
               //{
               //   entry[methodEntry] = methodReport[methodEntry];
               //}
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
    * @property {string}      classReport - An entry key found in the ClassReport to output.
    * @property {string}      methodReport - An entry key found in the MethodReport to output.
    * @property {string}      moduleReport - An entry key found in the ModuleReport to output.
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

               //if (typeof moduleEntry === 'string' && report[moduleEntry])
               //{
               //   output[moduleEntry] = report[moduleEntry];
               //}
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