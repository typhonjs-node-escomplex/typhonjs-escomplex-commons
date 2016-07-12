/**
 * Formats a project result modules as plain text.
 *
 * @param {ProjectResult}  result - A project result.
 *
 * @returns {string}
 */
export default function(result)
{
   return result.reports.reduce((formatted, report) => { return `${formatted}${report.srcPath}\n`; }, '');
}

