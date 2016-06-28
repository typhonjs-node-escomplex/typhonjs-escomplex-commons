'use strict';

/**
 * Provides a utility method that defers to `object.name` if it exists or fallback to `defaultName` or `anonymous`.
 *
 * @param {object}   object - The target object to provide safe name coverage.
 * @param {string}   defaultName - A default name to fallback to if `object.name` is missing.
 *
 * @returns {string}
 */
export default function(object, defaultName = '')
{
   if (object !== null && typeof object === 'object' && typeof object.name === 'string' && object.name !== '')
   {
      return object.name;
   }

   if (typeof defaultName === 'string' && defaultName !== '') { return defaultName; }

   return '<anonymous>';
}