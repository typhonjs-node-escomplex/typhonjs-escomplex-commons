'use strict';

import actualizeHalstead   from './actualizeHalstead.js';
import safeArray           from './safeArray.js';

import Trait               from './Trait.js';

/**
 * Provides a helper method to format core traits for escomplex processing.
 *
 * @param {function|number}         lloc - Logical lines of code
 * @param {function|number}         cyclomatic - The number of linearly independent paths through source code.
 * @param {function|string|Array}   operators - An operator carries out an action.
 * @param {function|string|Array}   operands - An operand participates in such an action (operator).
 * @param {function|string|Array}   ignoreKeys - Provides a list of AST node children keys to skip traversal.
 * @param {function|string}         newScope - Creates a new `class` or `method` scope for report generation.
 * @param {function|object}         dependencies - An import / require dependency.
 *
 * @returns {{lloc: Trait, cyclomatic: Trait, operators: Array, operands: Array, ignoreKeys: Trait, newScope: Trait, dependencies: Trait}}
 */
export default function(lloc = 0, cyclomatic = 0, operators = undefined, operands = undefined,
 ignoreKeys = undefined, newScope = undefined, dependencies = undefined)
{
   return {
      lloc: new Trait(lloc),
      cyclomatic: new Trait(cyclomatic),
      operators: actualizeHalstead(safeArray(operators)),
      operands: actualizeHalstead(safeArray(operands)),
      ignoreKeys: new Trait(safeArray(ignoreKeys)),
      newScope: new Trait(newScope),
      dependencies: new Trait(dependencies)
   };
}
