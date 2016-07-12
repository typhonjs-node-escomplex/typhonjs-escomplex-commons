/**
 * Formats a project result as an expanded JSON string with space parameter set to 3.
 *
 * @param {ProjectResult}  result - A project result.
 *
 * @returns {string}
 */
export default function(result)
{
   return JSON.stringify(result, undefined, 3);
}
