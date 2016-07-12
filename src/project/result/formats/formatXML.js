import StringUtil from '../../../utils/StringUtil';
import XMLUtil    from '../../../utils/XMLUtil';

/**
 * Formats a project result as XML.
 *
 * @param {ProjectResult}  result - A project result.
 *
 * @returns {string}
 */
export default function(result)
{
   const header = `xmlns="" xml:lang="en" first-order-density="${result.firstOrderDensity}`
    + `" change-cost="${result.changeCost}" core-size="${result.coreSize}"`;

   return XMLUtil.createElementWithAttributes(0, 'project', header, true,
    result.reports.reduce((formatted, report) => { return `${formatted}${formatModule(4, report)}`; }, ''));
}

/**
 * Formats an aggregate MethodReport.
 *
 * @param {number}         indentation - Current indentation amount.
 * @param {MethodReport}   methodReport - A MethodReport instance.
 *
 * @returns {string}
 */
function formatAggregate(indentation, methodReport)
{
   const nextIndentation = StringUtil.incrementIndent(indentation);

   return XMLUtil.createElement(indentation, 'aggregate', true,
    formatSlocComplexity(nextIndentation, methodReport.sloc)
     + formatParameterComplexity(nextIndentation, methodReport.params)
      + formatCyclomaticComplexity(nextIndentation, methodReport.cyclomatic)
       + formatCyclomaticDensity(nextIndentation, methodReport.cyclomaticDensity)
        + formatHalsteadComplexity(nextIndentation, methodReport.halstead));
}

/**
 * Formats a MethodReport.
 *
 * @param {number}         indentation - Current indentation amount.
 * @param {MethodReport}   methodReport - A MethodReport instance.
 *
 * @returns {string}
 */
function formatMethod(indentation, methodReport)
{
   const nextIndentation = StringUtil.incrementIndent(indentation);

   return XMLUtil.createElementWithAttributes(indentation, 'function',
    `name="${methodReport.name.replace('<', '&lt;').replace('>', '&gt;')}"`, true,
     XMLUtil.createElement(nextIndentation, 'lineStart', false, methodReport.lineStart)
      + formatSlocComplexity(nextIndentation, methodReport.sloc)
       + formatParameterComplexity(nextIndentation, methodReport.params)
        + formatCyclomaticComplexity(nextIndentation, methodReport.cyclomatic)
         + formatCyclomaticDensity(nextIndentation, methodReport.cyclomaticDensity)
          + formatHalsteadComplexity(nextIndentation, methodReport.halstead));
}

/**
 * Formats a module report.
 *
 * @param {number}         indentation - Current indentation amount.
 * @param {ModuleReport}   report - A module report.
 *
 * @returns {string}
 */
function formatModule(indentation, report)
{
   const nextIndentation = StringUtil.incrementIndent(indentation);

   let methods = '';

   for (let cntr = 0; cntr < report.methods.length; cntr++)
   {
      methods += formatMethod(nextIndentation, report.methods[cntr]);
   }

   return XMLUtil.createElementWithAttributes(indentation, 'module', `srcPath="${report.srcPath}"`, true,
    XMLUtil.createElement(nextIndentation, 'maintainability', false, report.maintainability)
     + formatAggregate(nextIndentation, report.aggregate) + methods);
}

/**
 * Formats MethodReport -> cyclomatic.
 *
 * @param {number}   indentation - Current indentation amount.
 * @param {number}   cyclomatic - The cyclomatic complexity of a method.
 *
 * @returns {string}
 */
function formatCyclomaticComplexity(indentation, cyclomatic)
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
function formatCyclomaticDensity(indentation, cyclomaticDensity)
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
function formatHalsteadComplexity(indentation, halstead)
{
   return XMLUtil.createElement(indentation, 'halstead', true,
    formatHalsteadMetrics(StringUtil.incrementIndent(indentation), halstead));
}

/**
 * Formats HalsteadData metrics.
 *
 * @param {number}         indentation - Current indentation amount.
 * @param {HalsteadData}   halstead - An instance of HalsteadData.
 *
 * @returns {string}
 */
function formatHalsteadMetrics(indentation, halstead)
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
function formatParameterComplexity(indentation, params)
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
function formatSlocComplexity(indentation, sloc)
{
   return XMLUtil.createElement(indentation, 'sloc', true,
    formatSlocMetrics(StringUtil.incrementIndent(indentation), sloc));
}

/**
 *
 * @param {number}   indentation - Current indentation amount.
 * @param {object}   sloc - The source lines of code for a method.
 *
 * @returns {string}
 */
function formatSlocMetrics(indentation, sloc)
{
   return XMLUtil.createElement(indentation, 'physical', false, sloc.physical)
    + XMLUtil.createElement(indentation, 'logical', false, sloc.logical);
}
