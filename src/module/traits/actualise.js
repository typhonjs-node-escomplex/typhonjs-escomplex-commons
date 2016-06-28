'use strict';

import actualiseHalstead   from './actualiseHalstead.js';
import safeArray           from './safeArray.js';

import Trait               from './Trait.js';

/**
 * Provides a helper method to format core traits for escomplex processing.
 *
 * @param lloc
 * @param cyclomatic
 * @param operators
 * @param operands
 * @param ignoreKeys
 * @param newScope
 * @param dependencies
 *
 * @returns {{lloc: Trait, cyclomatic: Trait, operators: Array, operands: Array, ignoreKeys: Trait, newScope: Trait, dependencies: Trait}}
 */
export default function(lloc = 0, cyclomatic = 0, operators = undefined, operands = undefined,
 ignoreKeys = undefined, newScope = undefined, dependencies = undefined)
{
   return {
      lloc: new Trait(lloc),
      cyclomatic: new Trait(cyclomatic),
      operators: actualiseHalstead(safeArray(operators)),
      operands: actualiseHalstead(safeArray(operands)),
      ignoreKeys: new Trait(safeArray(ignoreKeys)),
      newScope: new Trait(newScope),
      dependencies: new Trait(dependencies)
   };
}
