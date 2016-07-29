import ClassReport   from '../module/report/ClassReport';
import MethodReport  from '../module/report/MethodReport';
import ModuleReport  from '../module/report/ModuleReport';
import ProjectResult from '../project/result/ProjectResult';

/**
 * Provides a wrapper for analysis errors stored in the `errors` array for each report type.
 */
export default class AnalyzeError
{
   /**
    * Initializes an instance.
    *
    * @param {string}                                                severity - Provides the severity level.
    * @param {string}                                                message - Provides the error message.
    * @param {ClassReport|MethodReport|ModuleReport|ProjectResult}   sourceReport - The source of the error.
    * @param {ClassReport|MethodReport|ModuleReport|ProjectResult}   parentReport - Provides the parent report object.
    */
   constructor(severity = '<unknown>', message = '', sourceReport = void 0, parentReport = void 0)
   {
      /**
       * Provides the line number where the error starts.
       * @type {number}
       */
      this.lineStart = typeof sourceReport === 'object' ? sourceReport.lineStart : 0;

      /**
       * Provides the line number where the error starts.
       * @type {number}
       */
      this.lineEnd = typeof sourceReport === 'object' ? sourceReport.lineEnd : 0;

      /**
       * Provides the severity level.
       * @type {string}
       */
      this.severity = severity;

      /**
       * Provides the error message.
       * @type {string}
       */
      this.message = message;

      /**
       * Attempt to find the `name` then try `srcPath` for modules.
       */
      this.name = s_GET_NAME(sourceReport);

      /**
       * Provides a typeo of report where the error is found.
       * @type {string}
       */
      this.type = s_GET_TYPE(sourceReport, parentReport);
   }

   /**
    * Returns a verbose string about the error.
    * @returns {string}
    */
   toString()
   {
      return `${this.severity}: ${this.message} @ ${this.description} ${this.name !== '' ? `- ${this.name} ` :
       ''}(${this.lineStart} - ${this.lineEnd})`;
   }
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Creates a string description of the source report.
 *
 * @param {ClassReport|MethodReport|ModuleReport|ProjectResult}   sourceReport - The source of the error.
 *
 * @returns {string}
 * @ignore
 */
function s_GET_NAME(sourceReport)
{
   let name = '';

   if (sourceReport instanceof ClassReport) { name = sourceReport.name; }
   if (sourceReport instanceof MethodReport) { name = sourceReport.name; }
   if (sourceReport instanceof ModuleReport)
   {
      name = typeof sourceReport.srcPath === 'string' ? sourceReport.srcPath : '';
   }
   if (sourceReport instanceof ProjectResult) { name = ''; }

   return name;
}

/**
 * Creates a string type of the source report.
 *
 * @param {ClassReport|MethodReport|ModuleReport|ProjectResult}   sourceReport - The source of the error.
 * @param {ClassReport|MethodReport|ModuleReport|ProjectResult}   parentReport - Provides the parent report object.
 *
 * @returns {string}
 * @ignore
 */
function s_GET_TYPE(sourceReport, parentReport = void 0)
{
   let description = '';

   if (sourceReport instanceof ClassReport) { description = 'Class'; }
   if (sourceReport instanceof MethodReport)
   {
      if (parentReport instanceof ClassReport) { description = 'Class Method'; }
      else { description = 'Module Method'; }
   }
   if (sourceReport instanceof ModuleReport) { description = 'Module'; }
   if (sourceReport instanceof ProjectResult) { description = 'Project'; }

   return description;
}
