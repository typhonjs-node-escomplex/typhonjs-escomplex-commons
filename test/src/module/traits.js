'use strict';

import { assert }          from 'chai';

import Trait               from '../../../src/module/traits/Trait.js';
import TraitHalstead       from '../../../src/module/traits/TraitHalstead.js';

import actualise           from '../../../src/module/traits/actualise.js';
import actualiseHalstead   from '../../../src/module/traits/actualiseHalstead.js';

suite('traits:', () =>
{
   suite('actualise:', () =>
   {
      suite('string arguments:', () =>
      {
         let result;

         setup(() => { result = actualise('koda', 'basanda', 'bosoya', 'umahasha', 'tikki', 'ottobo', 'boshatta'); });
         teardown(() => { result = undefined; });

         test('result was object', () =>
         {
            assert.isObject(result);
         });

         test('lloc was correct', () =>
         {
            assert.instanceOf(result.lloc, Trait);
            assert.strictEqual(result.lloc.type, 'string');
            assert.strictEqual(result.lloc.valueOf(), 'koda');
         });

         test('cyclomatic was correct', () =>
         {
            assert.instanceOf(result.cyclomatic, Trait);
            assert.strictEqual(result.cyclomatic.type, 'string');
            assert.strictEqual(result.cyclomatic.valueOf(), 'basanda');
         });

         test('operators was correct', () =>
         {
            assert.isArray(result.operators);
            assert.lengthOf(result.operators, 1);
            assert.instanceOf(result.operators[0], TraitHalstead);
            assert.strictEqual(result.operators[0].type, 'object');
            assert.strictEqual(result.operators[0].valueOf(), 'bosoya');
            assert.strictEqual(result.operators[0].filter(), true);
         });

         test('operands was correct', () =>
         {
            assert.isArray(result.operands);
            assert.lengthOf(result.operands, 1);
            assert.instanceOf(result.operands[0], TraitHalstead);
            assert.strictEqual(result.operands[0].type, 'object');
            assert.strictEqual(result.operands[0].valueOf(), 'umahasha');
            assert.strictEqual(result.operands[0].filter(), true);
         });

         test('ignoreKeys was correct', () =>
         {
            assert.instanceOf(result.ignoreKeys, Trait);
            assert.strictEqual(result.ignoreKeys.type, 'object');
            assert.isArray(result.ignoreKeys.valueOf());
            assert.lengthOf(result.ignoreKeys.valueOf(), 1);
            assert.strictEqual(result.ignoreKeys.valueOf()[0], 'tikki');
         });

         test('newScope was correct', () =>
         {
            assert.instanceOf(result.newScope, Trait);
            assert.strictEqual(result.newScope.type, 'string');
            assert.strictEqual(result.newScope.valueOf(), 'ottobo');
         });

         test('dependencies was correct', () =>
         {
            assert.instanceOf(result.dependencies, Trait);
            assert.strictEqual(result.dependencies.type, 'string');
            assert.strictEqual(result.dependencies.valueOf(), 'boshatta');
         });
      });

      suite('array arguments:', () =>
      {
         let result;

         setup(() => { result = actualise('1', '2', ['3'], ['4'], ['5'], '6', '7'); });
         teardown(() => { result = undefined; });

         test('lloc was correct', () =>
         {
            assert.strictEqual(result.lloc.valueOf(), '1');
         });

         test('cyclomatic was correct', () =>
         {
            assert.strictEqual(result.cyclomatic.valueOf(), '2');
         });

         test('ignoreKeys was correct', () =>
         {
            assert.isArray(result.ignoreKeys.valueOf());
            assert.lengthOf(result.ignoreKeys.valueOf(), 1);
            assert.strictEqual(result.ignoreKeys.valueOf()[0], '5');
         });

         test('newScope was correct', () =>
         {
            assert.strictEqual(result.newScope.valueOf(), '6');
         });

         test('dependencies was correct', () =>
         {
            assert.strictEqual(result.dependencies.valueOf(), '7');
         });
      });

      suite('no arguments:', () =>
      {
         let result;

         setup(() => { result = actualise(); });

         teardown(() => { result = undefined; });

         test('ignoreKeys was correct', () =>
         {
            assert.isArray(result.ignoreKeys.valueOf());
            assert.lengthOf(result.ignoreKeys.valueOf(), 0);
         });
      });
   });

   suite('actualiseHalstead:', () =>
   {
      suite('no identifiers:', () =>
      {
         let result;

         setup(() => { result = actualiseHalstead([]); });
         teardown(() => { result = undefined; });

         test('result was array', () =>
         {
            assert.isArray(result);
         });

         test('result was empty', () =>
         {
            assert.lengthOf(result, 0);
         });
      });

      suite('one identifier:', () =>
      {
         let result;

         setup(() => { result = actualiseHalstead(['foo']); });
         teardown(() => { result = undefined; });

         test('result contained one item', () =>
         {
            assert.lengthOf(result, 1);
         });

         test('first item was correct', () =>
         {
            assert.instanceOf(result[0], TraitHalstead);
            assert.strictEqual(result[0].valueOf(), 'foo');
         });
      });

      suite('two identifiers:', () =>
      {
         let result;

         setup(() => { result = actualiseHalstead(['bar', 'baz']); });
         teardown(() => { result = undefined; });

         test('result contained two items', () =>
         {
            assert.lengthOf(result, 2);
         });

         test('first item was correct', () =>
         {
            assert.strictEqual(result[0].valueOf(), 'bar');
         });

         test('second item was correct', () =>
         {
            assert.strictEqual(result[1].valueOf(), 'baz');
         });
      });
   });
});
