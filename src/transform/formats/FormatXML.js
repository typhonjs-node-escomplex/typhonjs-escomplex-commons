import StringUtil from '../../utils/StringUtil';
import XMLUtil    from '../../utils/XMLUtil';

/**
 * Provides a format transform for ESComplex ModuleReport / ProjectResult instances converting them to XML.
 */
export default class FormatXML
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
    * Formats a project result as XML.
    *
    * @param {ProjectResult}  result - A project result.
    *
    * @returns {string}
    */
   formatResult(result)
   {
      const reportsAvailable = result.getSetting('serializeReports', false);

      const header = `xmlns="" xml:lang="en" first-order-density="${result.firstOrderDensity}`
       + `" change-cost="${result.changeCost}" core-size="${result.coreSize}"`;

      return XMLUtil.createElementWithAttributes(0, 'project', header, true, result.reports.reduce(
       (formatted, report) =>
      {
         return `${formatted}${this._formatModule(3, report, reportsAvailable)}`;
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
      return 'xml';
   }

   /**
    * Formats an aggregate MethodReport.
    *
    * @param {number}         indentation - Current indentation amount.
    * @param {MethodReport}   methodReport - A MethodReport instance.
    *
    * @returns {string}
    */
   _formatAggregate(indentation, methodReport)
   {
      const nextIndentation = StringUtil.incrementIndent(indentation);

      return XMLUtil.createElement(indentation, 'aggregate', true,
       this._formatSlocComplexity(nextIndentation, methodReport.sloc)
       + this._formatParameterComplexity(nextIndentation, methodReport.params)
       + this._formatCyclomaticComplexity(nextIndentation, methodReport.cyclomatic)
       + this._formatCyclomaticDensity(nextIndentation, methodReport.cyclomaticDensity)
       + this._formatHalsteadComplexity(nextIndentation, methodReport.halstead));
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

      return XMLUtil.createElementWithAttributes(indentation, 'function',
       `name="${methodReport.name.replace('<', '&lt;').replace('>', '&gt;')}"`, true,
       XMLUtil.createElement(nextIndentation, 'lineStart', false, methodReport.lineStart)
       + this._formatSlocComplexity(nextIndentation, methodReport.sloc)
       + this._formatParameterComplexity(nextIndentation, methodReport.params)
       + this._formatCyclomaticComplexity(nextIndentation, methodReport.cyclomatic)
       + this._formatCyclomaticDensity(nextIndentation, methodReport.cyclomaticDensity)
       + this._formatHalsteadComplexity(nextIndentation, methodReport.halstead));
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

         return XMLUtil.createElementWithAttributes(indentation, 'module', `srcPath="${report.srcPath}"`, true,
          XMLUtil.createElement(nextIndentation, 'maintainability', false, report.maintainability)
          + this._formatAggregate(nextIndentation, report.aggregate) + methods);
      }
      else
      {
         return XMLUtil.createEmptyElementWithAttributes(indentation, 'module', `srcPath="${report.srcPath}"`);
      }
   }

   /**
    * Formats MethodReport -> cyclomatic.
    *
    * @param {number}   indentation - Current indentation amount.
    * @param {number}   cyclomatic - The cyclomatic complexity of a method.
    *
    * @returns {string}
    */
   _formatCyclomaticComplexity(indentation, cyclomatic)
   {
      return XMLUtil.createElement(indentation, 'cyclomatic', false, cyclomatic);
   }

   /**
    * Formats MethodReport -> cyclomaticDensity.
    *
    * @param {number}   indentation - Current indentation amount.
    * @param {number}   cyclomaticDensity - The cyclomatic density of a method.
    *
    * @returns {string}
    */
   _formatCyclomaticDensity(indentation, cyclomaticDensity)
   {
      return XMLUtil.createElement(indentation, 'cyclomatic-density', false, cyclomaticDensity);
   }

   /**
    * Formats HalsteadData.
    *
    * @param {number}         indentation - Current indentation amount.
    * @param {HalsteadData}   halstead - An instance of HalsteadData.
    *
    * @returns {string}
    */
   _formatHalsteadComplexity(indentation, halstead)
   {
      return XMLUtil.createElement(indentation, 'halstead', true,
       this._formatHalsteadMetrics(StringUtil.incrementIndent(indentation), halstead));
   }

   /**
    * Formats HalsteadData metrics.
    *
    * @param {number}         indentation - Current indentation amount.
    * @param {HalsteadData}   halstead - An instance of HalsteadData.
    *
    * @returns {string}
    */
   _formatHalsteadMetrics(indentation, halstead)
   {
      return XMLUtil.createElement(indentation, 'length', false, halstead.length)
       + XMLUtil.createElement(indentation, 'vocabulary', false, halstead.vocabulary)
       + XMLUtil.createElement(indentation, 'difficulty', false, halstead.difficulty)
       + XMLUtil.createElement(indentation, 'volume', false, halstead.volume)
       + XMLUtil.createElement(indentation, 'effort', false, halstead.effort)
       + XMLUtil.createElement(indentation, 'bugs', false, halstead.bugs)
       + XMLUtil.createElement(indentation, 'time', false, halstead.time);
   }

   /**
    *
    * @param {number}   indentation - Current indentation amount.
    * @param {number}   params - The number of parameters for a method.
    *
    * @returns {string}
    */
   _formatParameterComplexity(indentation, params)
   {
      return XMLUtil.createElement(indentation, 'parameters', false, params);
   }

   /**
    *
    * @param {number}   indentation - Current indentation amount.
    * @param {object}   sloc - The source lines of code for a method.
    *
    * @returns {string}
    */
   _formatSlocComplexity(indentation, sloc)
   {
      return XMLUtil.createElement(indentation, 'sloc', true,
       this._formatSlocMetrics(StringUtil.incrementIndent(indentation), sloc));
   }

   /**
    *
    * @param {number}   indentation - Current indentation amount.
    * @param {object}   sloc - The source lines of code for a method.
    *
    * @returns {string}
    */
   _formatSlocMetrics(indentation, sloc)
   {
      return XMLUtil.createElement(indentation, 'physical', false, sloc.physical)
       + XMLUtil.createElement(indentation, 'logical', false, sloc.logical);
   }
}
