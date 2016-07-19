import ObjectUtil from '../../utils/ObjectUtil';

/**
 * Defines default thresholds for severity levels.
 * error levels: info, warning, error
 *
 * entry: error, line, severity, message, source
 *
 * @type {{methodReport: object}}
 */
const s_DEFAULT_THRESHOLDS =
{
   methodReport:
   {
      'cyclomatic': { info: 3, warning: 7, error: 12 },
      'halstead.difficulty': { info: 8, warning: 13, error: 20 }
   }
};

export default class FormatJSONCheckstyle
{
   /**
    * Formats a module report as JSON / checkstyle.
    *
    * @param {ModuleReport}   report - A module report.
    *
    * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
    * @property {{info: number, warning: number, error: number}} cyclomatic - A hash of name / number thresholds.
    * @property {{info: number, warning: number, error: number}} halstead - A hash of name / number thresholds.
    *
    * @returns {string}
    */
   formatReport()
   {
      return '';
   }

   /**
    * Formats a project result as JSON / checkstyle.
    *
    * @param {ProjectResult}  result - A project result.
    *
    * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
    * @property {{info: number, warning: number, error: number}} cyclomatic - A hash of name / number thresholds.
    * @property {{info: number, warning: number, error: number}} halstead - A hash of name / number thresholds.
    *
    * @returns {string}
    */
   formatResult(result, options = s_DEFAULT_THRESHOLDS)
   {
      const reportsAvailable = result.getSetting('serializeReports', false);

      const output = { version: '7.0', file: [] };

      result.reports.forEach((report) =>
      {
         output.file.push(this._formatModule(report, reportsAvailable, options));
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
      return 'json-checkstyle';
   }

   /**
    * Gets the format type.
    *
    * @returns {string}
    */
   get type()
   {
      return 'checkstyle';
   }

   /**
    * Formats a module report.
    *
    * @param {ModuleReport}   report - A module report.
    *
    * @param {boolean}        reportsAvailable - Indicates that the report metric data is available.
    *
    * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
    * @property {{info: number, warning: number, error: number}} cyclomatic - A hash of name / number thresholds.
    * @property {{info: number, warning: number, error: number}} halstead - A hash of name / number thresholds.
    *
    * @returns {object}
    */
   _formatModule(report, reportsAvailable, options)
   {
      const output = { name: report.srcPath, error: [] };

      if (reportsAvailable && options.methodReport)
      {
         for (let cntr = 0; cntr < report.methods.length; cntr++)
         {
            const errors = this._parseErrors(report.methods[cntr], options.methodReport);

            if (Array.isArray(errors)) { output.error = errors; }
         }

         for (let cntr = 0; cntr < report.classes.length; cntr++)
         {
            const classReport = report.classes[cntr];

            for (let cntr2 = 0; cntr2 < classReport.methods.length; cntr2++)
            {
               const errors = this._parseErrors(classReport.methods[cntr], options.methodReport);

               if (Array.isArray(errors)) { output.error = errors; }
            }
         }
      }

      return output;
   }

   _parseErrors(sourceObject, options)
   {
      let errors = undefined;

      for (const key in options)
      {
         const sourceObjectValue = ObjectUtil.safeAccess(sourceObject, key);

         if (typeof sourceObjectValue === 'number')
         {
            let severity = undefined;

            const map = options[key];

            for (const entryKey in map)
            {
               if (sourceObjectValue > map[entryKey]) { severity = entryKey; }
            }

            if (typeof severity === 'string')
            {
               if (!Array.isArray(errors)) { errors = []; }

               const error =
               {
                  line: sourceObject.lineStart,
                  severity,
                  message: `${key}: ${sourceObjectValue}`,
                  source: sourceObject.name
               };

               errors.push(error);
            }
         }
      }

      return errors;
   }
}