'use strict';

/**
 * Provides safe array creation from a given input.
 *
 * @param {*}  thing
 *
 * @returns {Array}
 */
export default function(thing)
{
   return typeof thing === 'undefined' || thing === null ? [] : Array.isArray(thing) ? thing : [thing];
}
