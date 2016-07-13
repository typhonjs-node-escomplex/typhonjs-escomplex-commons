import ProjectFormatter from  './ProjectFormatter';

import ModuleReport     from  '../../module/report/ModuleReport';
import MathUtil         from  '../../utils/MathUtil';
import StringUtil       from  '../../utils/StringUtil';

/**
 * Provides the default project report object which stores data pertaining to all modules / files contained.
 *
 * All module / file reports are stored in the `reports` member variable as ModuleReports.
 *
 * Various helper methods found in ModuleReport and AbstractReport help increment associated data during collection.
 */
export default class ProjectResult
{
   /**
    * Initializes ProjectReport with default values.
    *
    * @param {Array<ModuleReport>}  moduleReports - An array of ModuleReports for each module / file processed.
    *
    * @param {object}               settings - An object hash of the settings used in generating this report via
    *                                          ESComplexProject.
    */
   constructor(moduleReports, settings = {})
   {
      /**
       * Stores the settings used to generate the project report.
       * @type {object}
       */
      this.settings = typeof settings === 'object' ? settings : {};

      /**
       * Stores a compacted form of the adjacency matrix. Each row index corresponds to the same report index.
       * Each row entry corresponds to a report index. These relationships dictate the dependencies between all
       * report ModuleReports given the source paths.
       *
       * @type {Array<Array<number>>}
       */
      this.adjacencyList = undefined;

      /**
       * Measures the average percentage of modules affected when one module / file in the project is changed.
       * Lower is better.
       * @type {number}
       */
      this.changeCost = 0;

      /**
       * Measures the percentage of modules that are widely depended on which also depend on other modules.
       * Lower is better.
       * @type {number}
       */
      this.coreSize = 0;

      /**
       * Measures the average method cyclomatic complexity for the project.
       * @type {number}
       */
      this.cyclomatic = 0;

      /**
       * Measures the average method maintenance effort for the project.
       * @type {number}
       */
      this.effort = 0;

      /**
       * Measures the percentage of all possible internal dependencies that are actually realized in the project.
       * Lower is better.
       * @type {number}
       */
      this.firstOrderDensity = 0;

      /**
       * Measures the average method logical SLOC (source lines of code) for the project.
       * @type {number}
       */
      this.loc = 0;

      /**
       * Measures the average method maintainability index for the project.
       * @type {number}
       */
      this.maintainability = 0;

      /**
       * Measures the average number of method parameters for the project.
       * @type {number}
       */
      this.params = 0;

      /**
       * Stores all ModuleReport data for the project sorted by the module / files `srcPath`.
       * @type {Array<ModuleReport>}
       */
      this.reports = Array.isArray(moduleReports) ?
       moduleReports.sort((lhs, rhs) => { return StringUtil.compare(lhs.srcPath, rhs.srcPath); }) : [];

      /**
       * Stores a compacted form of the visibility matrix. Each row index corresponds to the same report index.
       * Each row entry corresponds to a report index. These relationships dictate the reverse visibility between all
       * report ModuleReports which may indirectly impact the given module / file.
       *
       * @type {Array<Array<number>>}
       */
      this.visibilityList = undefined;
   }

   /**
    * Returns the supported format types.
    *
    * @returns {string[]}
    */
   static getFormatTypes()
   {
      return ProjectFormatter.getTypes();
   }

   /**
    * Finalizes the ProjectResult. If `settings.serializeReports` is false output just `filePath`, `srcPath` &
    * `srcPathAlias` entries of reports.
    *
    * @returns {ProjectResult}
    */
   finalize()
   {
      if (typeof this.settings.serializeReports === 'boolean' && !this.settings.serializeReports)
      {
         this.reports = this.reports.map((report) =>
         {
            return { filePath: report.filePath, srcPath: report.srcPath, srcPathAlias: report.srcPathAlias };
         });
      }
      else
      {
         this.reports.forEach((report) => { report.finalize(); });
      }

      return MathUtil.toFixedTraverse(this);
   }

   /**
    * Deserializes a JSON object representing a ProjectResult.
    *
    * @param {object}   object - A JSON object of a ProjectResult that was previously serialized.
    *
    * @returns {ProjectResult}
    */
   static parse(object)
   {
      /* istanbul ignore if */
      if (typeof object !== 'object') { throw new TypeError('parse error: `object` is not an `object`.'); }

      const result = Object.assign(new ProjectResult(), object);

      if (result.reports.length > 0)
      {
         result.reports = result.reports.map((report) => { return ModuleReport.parse(report); });
      }

      return result;
   }

   /**
    * Formats this ProjectResult given the type.
    *
    * @param {string}   type - The type of formatter to use. Options include: `'json', 'json-minimal', 'markdown',
    *                          'text', 'text-minimal', 'text-modules', 'xml', 'xml-checkstyle'`.
    *
    * @returns {string}
    */
   toFormat(type)
   {
      return ProjectFormatter.format(this, type);
   }

   /**
    * Returns a string representing the adjacency relationships by printing out the report index followed by
    * dependent ModuleReport indices / `srcPaths`.
    *
    * @returns {string}
    */
   toStringAdjacency()
   {
      let result = '';

      /* istanbul ignore if */
      if (!Array.isArray(this.adjacencyList)) { return result; }

      this.adjacencyList.forEach((entry) =>
      {
         result += `${entry.row}:\t${this.reports[entry.row].srcPath}\n`;

         entry.cols.forEach((colIndex) =>
         {
            result += `\t${colIndex}:\t${this.reports[colIndex].srcPath}\n`;
         });

         result += '\n';
      });

      return result;
   }

   /**
    * Returns a string representing the visibility relationships by printing out the report index followed by
    * indirect reverse dependency ModuleReport indices / `srcPaths`.
    *
    * @returns {string}
    */
   toStringVisibility()
   {
      let result = '';

      /* istanbul ignore if */
      if (!Array.isArray(this.visibilityList)) { return result; }

      this.visibilityList.forEach((entry) =>
      {
         result += `${entry.row}:\t${this.reports[entry.row].srcPath}\n`;

         entry.cols.forEach((colIndex) =>
         {
            result += `\t${colIndex}:\t${this.reports[colIndex].srcPath}\n`;
         });

         result += '\n';
      });

      return result;
   }
}
