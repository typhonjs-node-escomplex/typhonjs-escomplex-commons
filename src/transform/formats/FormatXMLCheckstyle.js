import StringUtil from '../../utils/StringUtil';
import XMLUtil    from '../../utils/XMLUtil';

/**
 * Defines default thresholds for severity levels.
 * @type {{cyclomatic: number[], halstead: number[]}}
 */
const s_THRESHOLDS = { cyclomatic: [3, 7, 12], halstead: [8, 13, 20] };

/**
 * Defines the text description for severity levels.
 * @type {string[]}
 */
const s_SEVERITY_LEVELS = ['info', 'warning', 'error'];

export default class FormatXMLCheckstyle
{
   /**
    * Formats a module report as a JSON string.
    *
    * @param {ModuleReport}   report - A module report.
    *
    * @returns {string}
    */
   formatReport()
   {
      return '';
   }

   /**
    * Formats a project result as XML / checkstyle.
    *
    * @param {ProjectResult}  result - A project result.
    *
    * @returns {string}
    */
   formatResult(result)
   {
      const reportsAvailable = result.getSetting('serializeReports', false);

      return XMLUtil.createXMLDefinition() + XMLUtil.createElement(0, 'checkstyle', true,
       result.reports.reduce((formatted, report) =>
      {
         return formatted + this._formatModule(3, report, reportsAvailable);
      }, ''));
   }

   /**
    * Gets the file extension.
    *
    * @returns {string}
    */
   get extension()
   {
      return 'xml';
   }

   /**
    * Gets the format type.
    *
    * @returns {string}
    */
   get type()
   {
      return 'xml-checkstyle';
   }

   /**
    * Assigns a severity level based on a threshold check.
    *
    * @param {MethodReport}   methodReport - A MethodReport instance.
    *
    * @returns {string}
    */
   _assignSeverity(methodReport)
   {
      let severity = s_SEVERITY_LEVELS[0];

      s_SEVERITY_LEVELS.forEach((level, index) =>
      {
         if (methodReport.cyclomatic > s_THRESHOLDS.cyclomatic[index] ||
          methodReport.halstead.difficulty > s_THRESHOLDS.halstead[index])
         {
            severity = s_SEVERITY_LEVELS[index];
         }
      });

      return severity;
   }

   /**
    * Formats a MethodReport.
    *
    * @param {number}         indentation - Current indentation amount.
    * @param {MethodReport}   methodReport - A MethodReport instance.
    *
    * @returns {string}
    */
   _formatMethod(indentation, methodReport)
   {
      const nextIndentation = StringUtil.incrementIndent(indentation);

      const attributes =
       [
          `lineStart="${methodReport.lineStart}"`,
          `lineEnd="${methodReport.lineEnd}"`,
          `severity="${this._assignSeverity(methodReport)}"`,
          `message="Cyclomatic: ${methodReport.cyclomatic},`,
          `Halstead: ${methodReport.halstead.difficulty}`,
          `| Effort: ${methodReport.halstead.effort}`,
          `| Volume: ${methodReport.halstead.volume}`,
          `| Vocabulary: ${methodReport.halstead.vocabulary}"`,
          `source="${methodReport.name.replace('<', '&lt;').replace('>', '&gt;')}"`
       ].join(`\n${StringUtil.indent(nextIndentation)}`);

      return XMLUtil.createEmptyElementWithAttributes(indentation, 'error', attributes);
   }

   /**
    * Formats a module report.
    *
    * @param {number}         indentation - Current indentation amount.
    * @param {ModuleReport}   report - A module report.
    * @param {boolean}        reportsAvailable - Indicates that the report metric data is available.
    *
    * @returns {string}
    */
   _formatModule(indentation, report, reportsAvailable)
   {
      const nextIndentation = StringUtil.incrementIndent(indentation);

      if (reportsAvailable)
      {
         let methods = '';

         for (let cntr = 0; cntr < report.methods.length; cntr++)
         {
            methods += this._formatMethod(nextIndentation, report.methods[cntr]);
         }

         return XMLUtil.createElementWithAttributes(indentation, 'file', `name="${report.srcPath}"`, true, methods);
      }
      else
      {
         return XMLUtil.createEmptyElementWithAttributes(indentation, 'file', `name="${report.srcPath}"`);
      }
   }
}