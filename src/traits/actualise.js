'use strict';

import actualiseOperands    from './actualiseOperands.js';
import actualiseOperators   from './actualiseOperators.js';
import safeArray            from './safeArray.js';

/**
 * Provides a helper method to format core traits for escomplex processing.
 *
 * @param {number}         lloc - Logical lines of code
 * @param {number}         cyclomatic -
 * @param {string|Array}   operators -
 * @param {string|Array}   operands -
 * @param {string|Array}   ignoreKeys -
 * @param {boolean}         newScope -
 * @param {object}         dependencies -
 *
 * @returns {{lloc: number, cyclomatic: number, operators: Array, operands: Array, ignoreKeys: Array, newScope: boolean, dependencies: undefined}}
 */
export default function(lloc = 0, cyclomatic = 0, operators = undefined, operands = undefined,
 ignoreKeys = undefined, newScope = false, dependencies = undefined)
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
