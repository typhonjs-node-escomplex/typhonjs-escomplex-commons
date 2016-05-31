'use strict';

/**
 * Provides a utility method that defers to `object.name` if it exists or fallback to `defaultName` or `anonymous`.
 *
 * @param {object}   object - The target object to provide safe name coverage.
 * @param {string}   defaultName - A default name to fallback to if `object.name` is missing.
 *
 * @returns {string}
 */

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = function (object) {
   var defaultName = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

   if (object !== null && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && typeof object.name === 'string' && object.name !== '') {
      return object.name;
   }

   if (typeof defaultName === 'string' && defaultName !== '') {
      return defaultName;
   }

   return '<anonymous>';
};

module.exports = exports['default'];