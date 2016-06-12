'use strict';

import actualiseOperands    from './actualiseOperands.js';
import actualiseOperators   from './actualiseOperators.js';
import safeArray            from './safeArray.js';

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
export default function(lloc = 0, cyclomatic = 0, operators = undefined, operands = undefined,
 ignoreKeys = undefined, newScope = undefined, dependencies = undefined)
{
   return {
      lloc,
      cyclomatic,
      operators: actualiseOperators(safeArray(operators)),
      operands: actualiseOperands(safeArray(operands)),
      ignoreKeys: safeArray(ignoreKeys),
      newScope,
      dependencies
   };
}
