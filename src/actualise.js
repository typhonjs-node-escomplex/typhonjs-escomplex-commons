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
 * @param {string}         newScope -
 * @param {object}         dependencies -
 *
 * @returns {{lloc: *, cyclomatic: *, operators: Array, operands: Array, ignoreKeys: Array, newScope: *, dependencies: *}}
 */
export default function(lloc, cyclomatic, operators, operands, ignoreKeys, newScope, dependencies)
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
