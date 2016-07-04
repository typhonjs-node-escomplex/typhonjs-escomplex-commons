/**
 * Provides safe array creation from a given input.
 *
 * @param {*}  value - A value to potentially convert into a safe array.
 *
 * @returns {Array}
 */
export default function(value)
{
   return typeof value === 'undefined' || value === null ? [] : Array.isArray(value) ? value : [value];
}
