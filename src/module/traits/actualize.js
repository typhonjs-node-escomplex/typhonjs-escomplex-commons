'use strict';

import HalsteadArray from './HalsteadArray.js';
import Trait         from './Trait.js';

import safeArray     from './safeArray.js';

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
 * @returns {{lloc: Trait, cyclomatic: Trait, operators: HalsteadArray, operands: HalsteadArray, ignoreKeys: Trait, newScope: Trait, dependencies: Trait}}
 */
export default function(lloc = 0, cyclomatic = 0, operators = undefined, operands = undefined,
 ignoreKeys = undefined, newScope = undefined, dependencies = undefined)
{
   return {
      lloc: new Trait(lloc),
      cyclomatic: new Trait(cyclomatic),
      operators: new HalsteadArray(safeArray(operators), 'operators'),
      operands: new HalsteadArray(safeArray(operands), 'operands'),
      ignoreKeys: new Trait(safeArray(ignoreKeys)),
      newScope: new Trait(newScope),
      dependencies: new Trait(dependencies)
   };
}
