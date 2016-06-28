'use strict';

import TraitHalstead from './TraitHalstead.js';

/**
 * Properly formats Halstead properties: `operands` & `operators`.
 *
 * @param {Array} properties - Halstead properties to actualize.
 *
 * @returns {Array}
 */
export default function(properties)
{
   return properties.map((property) =>
   {
      return property && typeof property.identifier !== 'undefined' ? new TraitHalstead(property) :
         new TraitHalstead({ identifier: property });
   });
}
