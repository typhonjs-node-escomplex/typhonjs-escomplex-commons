'use strict';

/**
 * Properly formats operators properties.
 *
 * @param {Array} properties - properties to actualise.
 *
 * @returns {Array}
 */
export default function(properties)
{
   return properties.map((property) =>
   {
      return property && typeof property.identifier !== 'undefined' ? property : { identifier: property };
   });
}
