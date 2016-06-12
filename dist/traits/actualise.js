'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var lloc = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var cyclomatic = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
  var operators = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];
  var operands = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];
  var ignoreKeys = arguments.length <= 4 || arguments[4] === undefined ? undefined : arguments[4];
  var newScope = arguments.length <= 5 || arguments[5] === undefined ? undefined : arguments[5];
  var dependencies = arguments.length <= 6 || arguments[6] === undefined ? undefined : arguments[6];

  return {
    lloc: lloc,
    cyclomatic: cyclomatic,
    operators: (0, _actualiseOperators2.default)((0, _safeArray2.default)(operators)),
    operands: (0, _actualiseOperands2.default)((0, _safeArray2.default)(operands)),
    ignoreKeys: (0, _safeArray2.default)(ignoreKeys),
    newScope: newScope,
    dependencies: dependencies
  };
};

var _actualiseOperands = require('./actualiseOperands.js');

var _actualiseOperands2 = _interopRequireDefault(_actualiseOperands);

var _actualiseOperators = require('./actualiseOperators.js');

var _actualiseOperators2 = _interopRequireDefault(_actualiseOperators);

var _safeArray = require('./safeArray.js');

var _safeArray2 = _interopRequireDefault(_safeArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/**
 * Provides a helper method to format core traits for escomplex processing.
 *
 * @param {function|number}         lloc - Logical lines of code
 * @param {function|number}         cyclomatic - The number of linearly independent paths through source code.
 * @param {function|string|Array}   operators - An operator carries out an action.
 * @param {function|string|Array}   operands - An operand participates in such an action (operator).
 * @param {function|string|Array}   ignoreKeys - Provides a list of AST node children keys to skip traversal.
 * @param {function|boolean}        newScope - Creates a new class / function scope for report generation.
 * @param {function|object}         dependencies - An import / require dependency.
 *
 * @returns {{lloc: number, cyclomatic: number, operators: Array, operands: Array, ignoreKeys: Array, newScope: boolean, dependencies: undefined}}
 */