'use strict';

/**
 * Properly formats operator properties.
 *
 * @param {Array} identifiers - operators to actualise.
 *
 * @returns {Array}
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (identifiers) {
  return identifiers.map(function (identifier) {
    return { identifier: identifier };
  });
};

module.exports = exports['default'];