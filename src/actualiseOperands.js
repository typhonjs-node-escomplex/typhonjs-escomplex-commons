'use strict';

/**
 * Properly formats operator properties.
 *
 * @param {Array} identifiers - operators to actualise.
 *
 * @returns {Array}
 */
export default function(identifiers)
{
   return identifiers.map((identifier) => { return { identifier }; });
}
