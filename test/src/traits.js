'use strict';

import { assert }          from 'chai';

import actualise           from '../../src/traits/actualise.js';
import actualiseOperands   from '../../src/traits/actualiseOperands.js';
import actualiseOperators  from '../../src/traits/actualiseOperators.js';

const actualisePath = '../../dist/traits/actualise';
const actualiseOperandsPath = '../../dist/traits/actualiseOperands';
const actualiseOperatorsPath = '../../dist/traits/actualiseOperators';

suite('traits:', () =>
{
   suite('require actualise:', () =>
   {
      let requireActualise;

      setup(() => { requireActualise = require(actualisePath); });
      teardown(() => { requireActualise = undefined; });

      test('require does not throw', () =>
      {
         assert.doesNotThrow(() => { require(actualisePath); });
      });

      test('actualise function is exported', () =>
      {
         assert.isFunction(requireActualise);
      });

      test('actualise does not throw', () =>
      {
         assert.doesNotThrow(() => { requireActualise(); });
      });
   });

   suite('require actualiseOperands:', () =>
   {
      let requireActualiseOperands;

      setup(() => { requireActualiseOperands = require(actualiseOperandsPath); });
      teardown(() => { requireActualiseOperands = undefined; });

      test('actualiseOperands function is exported', () =>
      {
         assert.isFunction(requireActualiseOperands);
      });

      test('actualiseOperands throws when identifiers is object', () =>
      {
         assert.throws(() => { requireActualiseOperands({}); });
      });

      test('actualiseOperands does not throw when identifiers is array', () =>
      {
         assert.doesNotThrow(() => { requireActualiseOperands([]); });
      });
   });

   suite('require actualiseOperators:', () =>
   {
      let requireActualiseOperators;

      setup(() => { requireActualiseOperators = require(actualiseOperatorsPath); });
      teardown(() => { requireActualiseOperators = undefined; });

      test('actualiseOperators function is exported', () =>
      {
         assert.isFunction(requireActualiseOperators);
      });

      test('actualiseOperators throws when properties is object', () =>
      {
         assert.throws(() => { requireActualiseOperators({}); });
      });

      test('actualiseOperators does not throw when properties is array', () =>
      {
         assert.doesNotThrow(() => { requireActualiseOperators([]); });
      });
   });

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
            assert.strictEqual(result.lloc, 'koda');
         });

         test('cyclomatic was correct', () =>
         {
            assert.strictEqual(result.cyclomatic, 'basanda');
         });

         test('operators was correct', () =>
         {
            assert.strictEqual(JSON.stringify(result.operators), '[{"identifier":"bosoya"}]');
         });

         test('operands was correct', () =>
         {
            assert.strictEqual(JSON.stringify(result.operands), '[{"identifier":"umahasha"}]');
         });

         test('ignoreKeys was correct', () =>
         {
            assert.isArray(result.ignoreKeys);
            assert.lengthOf(result.ignoreKeys, 1);
            assert.strictEqual(result.ignoreKeys[0], 'tikki');
         });

         test('newScope was correct', () =>
         {
            assert.strictEqual(result.newScope, 'ottobo');
         });

         test('dependencies was correct', () =>
         {
            assert.strictEqual(result.dependencies, 'boshatta');
         });
      });

      suite('array arguments:', () =>
      {
         let result;

         setup(() => { result = actualise('1', '2', ['3'], ['4'], ['5'], '6', '7'); });
         teardown(() => { result = undefined; });

         test('lloc was correct', () =>
         {
            assert.strictEqual(result.lloc, '1');
         });

         test('cyclomatic was correct', () =>
         {
            assert.strictEqual(result.cyclomatic, '2');
         });

         test('ignoreKeys was correct', () =>
         {
            assert.isArray(result.ignoreKeys);
            assert.lengthOf(result.ignoreKeys, 1);
            assert.strictEqual(result.ignoreKeys[0], '5');
         });

         test('newScope was correct', () =>
         {
            assert.strictEqual(result.newScope, '6');
         });

         test('dependencies was correct', () =>
         {
            assert.strictEqual(result.dependencies, '7');
         });
      });

      suite('no arguments:', () =>
      {
         let result;

         setup(() => { result = actualise(); });

         teardown(() => { result = undefined; });

         test('ignoreKeys was correct', () =>
         {
            assert.isArray(result.ignoreKeys);
            assert.lengthOf(result.ignoreKeys, 0);
         });
      });
   });

   suite('actualiseOperands:', () =>
   {
      suite('no identifiers:', () =>
      {
         let result;

         setup(() => { result = actualiseOperands([]); });
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

         setup(() => { result = actualiseOperands(['foo']); });
         teardown(() => { result = undefined; });

         test('result contained one item', () =>
         {
            assert.lengthOf(result, 1);
         });

         test('first item was correct', () =>
         {
            assert.isObject(result[0]);
            assert.strictEqual(result[0].identifier, 'foo');
         });
      });

      suite('two identifiers:', () =>
      {
         let result;

         setup(() => { result = actualiseOperands(['bar', 'baz']); });
         teardown(() => { result = undefined; });

         test('result contained two items', () =>
         {
            assert.lengthOf(result, 2);
         });

         test('first item was correct', () =>
         {
            assert.strictEqual(result[0].identifier, 'bar');
         });

         test('second item was correct', () =>
         {
            assert.strictEqual(result[1].identifier, 'baz');
         });
      });
   });

   suite('actualiseOperators:', () =>
   {
      suite('no properties:', () =>
      {
         let result;

         setup(() => { result = actualiseOperators([]); });
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

      suite('one property with identifier:', () =>
      {
         let result;

         setup(() => { result = actualiseOperators([{ identifier: 'foo' }]); });
         teardown(() => { result = undefined; });

         test('result contained one item', () =>
         {
            assert.lengthOf(result, 1);
         });

         test('first item was correct', () =>
         {
            assert.isObject(result[0]);
            assert.strictEqual(result[0].identifier, 'foo');
         });
      });

      suite('one identifier:', () =>
      {
         let result;

         setup(() => { result = actualiseOperators(['foo']); });
         teardown(() => { result = undefined; });

         test('result contained one item', () =>
         {
            assert.lengthOf(result, 1);
         });

         test('first item was correct', () =>
         {
            assert.isObject(result[0]);
            assert.strictEqual(result[0].identifier, 'foo');
         });
      });

      suite('two properties:', () =>
      {
         let result;

         setup(() => { result = actualiseOperators(['bar', { identifier: 'baz' }]); });
         teardown(() => { result = undefined; });

         test('result contained two items', () =>
         {
            assert.lengthOf(result, 2);
         });

         test('first item was correct', () =>
         {
            assert.strictEqual(result[0].identifier, 'bar');
         });

         test('second item was correct', () =>
         {
            assert.strictEqual(result[1].identifier, 'baz');
         });
      });
   });
});
