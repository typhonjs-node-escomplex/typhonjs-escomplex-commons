'use strict';

/**
 * Provides safe array creation from a given input.
 *
 * @param {*}  value - A value to potentially convert into a safe array.
 *
 * @returns {Array}
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  return typeof value === 'undefined' || value === null ? [] : Array.isArray(value) ? value : [value];
};

module.exports = exports['default'];