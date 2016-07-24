import { assert }       from 'chai';

import MethodAverage    from '../../../src/module/report/averages/MethodAverage';
import ObjectUtil       from '../../../src/utils/ObjectUtil';

import * as testconfig  from '../testconfig';

const s_TEST_OBJECT = new MethodAverage();

const s_TEST_CONFIRM = '["cyclomatic","cyclomaticDensity","halstead.bugs","halstead.difficulty","halstead.effort","halstead.length","halstead.time","halstead.vocabulary","halstead.volume","halstead.operands.distinct","halstead.operands.total","halstead.operators.distinct","halstead.operators.total","params","sloc.logical","sloc.physical"]';

if (testconfig.modules['utilObject'])
{
   suite('utils:', () =>
   {
      suite('ObjectUtil', () =>
      {
         suite('getAccessorList:', () =>
         {
            test('MethodAverage accessors correct', () =>
            {
               const result = ObjectUtil.getAccessorList(s_TEST_OBJECT);

               assert.strictEqual(JSON.stringify(result), s_TEST_CONFIRM);
            });
         });
      });
   });
}

