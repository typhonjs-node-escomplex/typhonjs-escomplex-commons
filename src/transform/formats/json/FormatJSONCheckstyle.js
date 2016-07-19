import ObjectUtil from '../../../utils/ObjectUtil';

/**
 * Defines default thresholds for severity levels.
 * error levels: info, warning, error
 *
 * entry: error, line, severity, message, source
 *
 * @type {{methodReport: object}}
 * @ignore
 */
const s_DEFAULT_THRESHOLDS =
{
   classReport:
   {
      maintainability: { _test: '<', info: 115, warning: 100, error: 90 }
   },
   methodReport:
   {
      'cyclomatic': { info: 3, warning: 7, error: 12 },
      'halstead.difficulty': { info: 8, warning: 13, error: 20 }
   },
   moduleReport:
   {
      maintainability: { _test: '<', info: 115, warning: 100, error: 90 }
   }
};

/**
 * Provides a format transform for ESComplex ModuleReport / ProjectResult instances converting them to JSON that
 * corresponds to the XML checkstyle format.
 *
 * The checkstyle XML format outputs error elements for each file / module. This format depends on the output of
 * `FormatJSONCheckstyle`. The implementation below outputs a `file` array that contains an `error` array entries.
 *
 * There is a corresponding `FormatXMLCheckstyle` format loaded when `escomplex-plugin-formats-xml` during plugin
 * loading which converts the JSON output of this format transform to the official XML checkstyle format.
 *
 * @see http://checkstyle.sourceforge.net/
 * @see https://github.com/checkstyle/checkstyle
 * @see https://github.com/checkstyle/checkstyle/blob/master/src/main/java/com/puppycrawl/tools/checkstyle/XMLLogger.java
 */
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
   formatReport(report, options = s_DEFAULT_THRESHOLDS)
   {
      const output = { version: '7.0', file: [] };

      output.file.push(this._formatModule(report, true, options));

      return typeof options === 'object' && Number.isInteger(options.spacing) ?
       JSON.stringify(output, undefined, options.spacing) : JSON.stringify(output);
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
      const output = {};

      output.name = report.filePath ? report.filePath : '<unknown>';

      output.error = [];

      if (reportsAvailable)
      {
         if (typeof options.moduleReport === 'object')
         {
            this._parseErrors(`Module: ${output.name}`, report, options.moduleReport, output.error);
         }

         for (let cntr = 0; cntr < report.methods.length; cntr++)
         {
            if (typeof options.methodReport === 'object')
            {
               this._parseErrors('Module method: ', report.methods[cntr], options.methodReport, output.error);
            }
         }

         for (let cntr = 0; cntr < report.classes.length; cntr++)
         {
            const classReport = report.classes[cntr];

            if (typeof options.classReport === 'object')
            {
               this._parseErrors(`Class: `, classReport, options.classReport, output.error);
            }

            for (let cntr2 = 0; cntr2 < classReport.methods.length; cntr2++)
            {
               if (typeof options.methodReport === 'object')
               {
                  this._parseErrors(`Class (${classReport.name}) / method: `, classReport.methods[cntr2],
                   options.methodReport, output.error);
               }
            }
         }
      }

      return output;
   }

   _parseErrors(sourceObjectType, sourceObject, options, errors)
   {
      for (const key in options)
      {
         if (!options.hasOwnProperty(key)) { continue; }

         const sourceObjectValue = ObjectUtil.safeAccess(sourceObject, key);

         if (typeof sourceObjectValue === 'number')
         {
            let severity = undefined;
            let mapEntryValue;
            let testSign;

            const map = options[key];

            for (const entryKey in map)
            {
               if (!map.hasOwnProperty(entryKey)) { continue; }

               // Skip `_test` entry.
               if (entryKey === '_test') { continue; }

               switch (map._test)
               {
                  case '<':
                     if (sourceObjectValue < map[entryKey])
                     {
                        severity = entryKey;
                        mapEntryValue = map[entryKey];
                        testSign = ' < ';
                     }
                     break;

                  case '<=':
                     if (sourceObjectValue <= map[entryKey])
                     {
                        severity = entryKey;
                        mapEntryValue = map[entryKey];
                        testSign = ' <= ';
                     }
                     break;

                  case '>=':
                     if (sourceObjectValue >= map[entryKey])
                     {
                        severity = entryKey;
                        mapEntryValue = map[entryKey];
                        testSign = ' >= ';
                     }
                     break;

                  default:
                     if (sourceObjectValue > map[entryKey])
                     {
                        severity = entryKey;
                        mapEntryValue = map[entryKey];
                        testSign = ' > ';
                     }
                     break;
               }
            }

            if (typeof severity === 'string')
            {
               errors.push(
               {
                  line: sourceObject.lineStart,
                  severity,
                  message: `${key}: ${sourceObjectValue}${testSign}${mapEntryValue}`,
                  source: `${sourceObjectType}${typeof sourceObject.name === 'string' ? sourceObject.name : ''}`
               });
            }
         }
      }
   }
}