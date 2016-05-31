'use strict';

/**
 * Properly formats operators properties.
 *
 * @param {Array} properties - properties to actualise.
 *
 * @returns {Array}
 */

Object.defineProperty(exports, "__esModule", {
   value: true
});

exports.default = function (properties) {
   return properties.map(function (property) {
      return property && typeof property.identifier !== 'undefined' ? property : { identifier: property };
   });
};

module.exports = exports['default'];