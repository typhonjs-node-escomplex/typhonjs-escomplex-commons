'use strict';

import 'babel-polyfill';

import { assert }    from 'chai';

import HalsteadArray from '../../../src/module/traits/HalsteadArray';
import ModuleReport  from '../../../src/module/report/ModuleReport';
import Trait         from '../../../src/module/traits/Trait';
import TraitHalstead from '../../../src/module/traits/TraitHalstead';

import actualize     from '../../../src/module/traits/actualize';
import safeName      from '../../../src/module/traits/safeName';

suite('traits:', () =>
{
   suite('actualize:', () =>
   {
      suite('string arguments:', () =>
      {
         let result;

         setup(() => { result = actualize('koda', 'basanda', 'bosoya', 'umahasha', 'tikki', 'ottobo', 'boshatta'); });
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
            assert.instanceOf(result.operators, HalsteadArray);
            assert.strictEqual(result.operators.length, 1);
            assert.strictEqual(result.operators.metric, 'operators');
            assert.instanceOf(result.operators.get(0), TraitHalstead);
            assert.strictEqual(result.operators.get(0).type, 'object');
            assert.strictEqual(result.operators.get(0).valueOf(), 'bosoya');
            assert.strictEqual(result.operators.get(0).filter(), true);
         });

         test('operands was correct', () =>
         {
            assert.instanceOf(result.operands, HalsteadArray);
            assert.strictEqual(result.operands.length, 1);
            assert.strictEqual(result.operands.metric, 'operands');
            assert.instanceOf(result.operands.get(0), TraitHalstead);
            assert.strictEqual(result.operands.get(0).type, 'object');
            assert.strictEqual(result.operands.get(0).valueOf(), 'umahasha');
            assert.strictEqual(result.operands.get(0).filter(), true);
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

         setup(() => { result = actualize('1', '2', ['3'], ['4'], ['5'], '6', '7'); });
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

         setup(() => { result = actualize(); });

         teardown(() => { result = undefined; });

         test('ignoreKeys was correct', () =>
         {
            assert.isArray(result.ignoreKeys.valueOf());
            assert.lengthOf(result.ignoreKeys.valueOf(), 0);
         });
      });
   });

   suite('safeName:', () =>
   {
      suite('parsing is correct:', () =>
      {
         test('result with no parameters return `<anonymous>`', () =>
         {
            const result = safeName();
            assert.strictEqual(result, '<anonymous>');
         });

         test('result with null data and default value', () =>
         {
            const result = safeName(null, 'default');
            assert.strictEqual(result, 'default');
         });

         test('result with `object.name`', () =>
         {
            const result = safeName({ name: 'safe!' }, 'default');
            assert.strictEqual(result, 'safe!');
         });
      });
   });

   suite('HalsteadArray:', () =>
   {
      suite('no identifiers:', () =>
      {
         let result;

         setup(() => { result = new HalsteadArray([], 'operators'); });
         teardown(() => { result = undefined; });

         test('result was empty', () =>
         {
            assert.strictEqual(result.length, 0);
         });

         test('result metric is correct', () =>
         {
            assert.strictEqual(result.metric, 'operators');
         });
      });

      suite('one identifier:', () =>
      {
         let result;

         setup(() => { result = new HalsteadArray(['foo'], 'operators'); });
         teardown(() => { result = undefined; });

         test('result contained one item', () =>
         {
            assert.strictEqual(result.length, 1);
         });

         test('result forEach', () =>
         {
            result.forEach((traitHalstead) => { assert.strictEqual(traitHalstead.valueOf(), 'foo'); });
         });

         test('first item was correct', () =>
         {
            assert.instanceOf(result.get(0), TraitHalstead);
            assert.strictEqual(result.get(0).valueOf('unused'), 'foo');
         });
      });

      suite('two identifiers:', () =>
      {
         let result;

         setup(() => { result = new HalsteadArray(['bar', 'baz'], 'operators'); });
         teardown(() => { result = undefined; });

         test('result contained two items', () =>
         {
            assert.strictEqual(result.length, 2);
         });

         test('first item was correct', () =>
         {
            assert.instanceOf(result.get(0), TraitHalstead);
            assert.strictEqual(result.get(0).valueOf(), 'bar');
         });

         test('second item was correct', () =>
         {
            assert.instanceOf(result.get(1), TraitHalstead);
            assert.strictEqual(result.get(1).valueOf(), 'baz');
         });
      });

      suite('process report:', () =>
      {
         test('report contains correct operator identifiers', () =>
         {
            // Note the 3rd identifier has a filter method to skip processing.
            const halsteadArray = new HalsteadArray(
             ['foo', 'bar', ['baz', 'biz'], { identifier: 'ignored', filter: () => { return false; } }],
              'operators');

            const report = new ModuleReport(0, 0);

            halsteadArray.process(report, 'unused');
            report.finalize();

            assert.lengthOf(report.aggregate.halstead.operators.identifiers, 4);
            assert.strictEqual(report.aggregate.halstead.operators.identifiers[0], 'foo');
            assert.strictEqual(report.aggregate.halstead.operators.identifiers[1], 'bar');
            assert.strictEqual(report.aggregate.halstead.operators.identifiers[2], 'baz');
            assert.strictEqual(report.aggregate.halstead.operators.identifiers[3], 'biz');
         });
      });

      suite('valueOf:', () =>
      {
         test('HalsteadArray valueOf contains correct operator identifiers', () =>
         {
            // Note the 3rd identifier has a filter method to skip processing.
            const halsteadArray = new HalsteadArray(
             ['foo', 'bar', ['baz', 'biz'], { identifier: 'ignored', filter: () => { return false; } }],
              'operators');

            const result = halsteadArray.valueOf('unused');

            assert.lengthOf(result, 3);
            assert.strictEqual(result[0], 'foo');
            assert.strictEqual(result[1], 'bar');
            assert.strictEqual(result[2][0], 'baz');
            assert.strictEqual(result[2][1], 'biz');
         });
      });
   });

   suite('Trait:', () =>
   {
      suite('with function / params:', () =>
      {
         let result;

         setup(() => { result = new Trait((value) => { return value; }); });
         teardown(() => { result = undefined; });

         test('result with function / params is correct', () =>
         {
            assert.strictEqual(result.valueOf('foobar'), 'foobar');
         });
      });
   });
});
