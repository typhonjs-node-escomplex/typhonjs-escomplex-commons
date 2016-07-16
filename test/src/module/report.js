import { assert }       from 'chai';

import ClassReport      from '../../../src/module/report/ClassReport';
import MethodReport     from '../../../src/module/report/MethodReport';
import ModuleReport     from '../../../src/module/report/ModuleReport';

import * as testconfig  from '../testconfig';

if (testconfig.modules['moduleReport'])
{
   suite('report:', () =>
   {
      suite('ModuleReport:', () =>
      {
         suite('instantiation:', () =>
         {
            let report;

            setup(() => { report = new ModuleReport(10, 100); });
            teardown(() => { report = undefined; });

            test('report has correct line start / end', () =>
            {
               assert.strictEqual(report.lineStart, 10);
               assert.strictEqual(report.lineEnd, 100);
            });
         });

         suite('addDependencies:', () =>
         {
            let report;

            setup(() => { report = new ModuleReport(10, 100); });
            teardown(() => { report = undefined; });

            test('report has correct dependencies', () =>
            {
               report.addDependencies({ type: 'esm' });

               assert.lengthOf(report.dependencies, 1);
            });
         });

         suite('createScope / popScope:', () =>
         {
            let report;

            setup(() => { report = new ModuleReport(10, 100); });
            teardown(() => { report = undefined; });

            test('report has correct class scope', () =>
            {
               assert.isUndefined(report.getCurrentClassReport());

               let classReport = report.createScope('class', 100, 200);
               let classReport2 = report.getCurrentClassReport();

               assert.instanceOf(classReport, ClassReport);
               assert.instanceOf(classReport2, ClassReport);

               assert.lengthOf(report.classes, 1);

               assert.strictEqual(classReport, classReport2);

               classReport = report.popScope('class');
               classReport2 = report.getCurrentClassReport();

               assert.isUndefined(classReport);
               assert.isUndefined(classReport2);
            });

            test('report has correct method scope', () =>
            {
               assert.isUndefined(report.getCurrentMethodReport());

               let methodReport = report.createScope('method', 100, 200);
               let methodReport2 = report.getCurrentMethodReport();

               assert.instanceOf(methodReport, MethodReport);
               assert.instanceOf(methodReport2, MethodReport);

               assert.lengthOf(report.methods, 1);

               assert.strictEqual(methodReport, methodReport2);

               methodReport = report.popScope('method');
               methodReport2 = report.getCurrentMethodReport();

               assert.isUndefined(methodReport);
               assert.isUndefined(methodReport2);
            });

            test('report has correct class w/ method scope', () =>
            {
               report.createScope('class', 100, 200);
               report.createScope('method', 100, 200, 4);

               assert.lengthOf(report.classes, 1);
               assert.lengthOf(report.classes[0].methods, 1);

               assert.lengthOf(report.methods, 0);
            });

            test('error thrown for unknown scope type', () =>
            {
               assert.throws(() => { report.createScope('unknown', 100, 200); });
               assert.throws(() => { report.popScope('unknown'); });
            });

            test('finalize removes `_methodReport`', () =>
            {
               assert.isObject(report._methodReport);
               report.finalize();
               assert.isNotObject(report._methodReport);
            });
         });

         suite('halsteadItemEncountered:', () =>
         {
            let report;

            setup(() => { report = new ModuleReport(10, 100); });
            teardown(() => { report = undefined; });

            test('report has correct class w/ method halstead metrics', () =>
            {
               report.createScope('class', 100, 200);
               report.createScope('method', 100, 200, 0);

               report.halsteadItemEncountered('operators', 'test');

               assert.strictEqual(report.aggregate.halstead.operators.identifiers[0], 'test');
               assert.strictEqual(report.classes[0].aggregate.halstead.operators.identifiers[0], 'test');
               assert.strictEqual(report.classes[0].methods[0].halstead.operators.identifiers[0], 'test');
            });
         });

         suite('incrementCyclomatic:', () =>
         {
            let report;

            setup(() => { report = new ModuleReport(10, 100); });
            teardown(() => { report = undefined; });

            test('report has correct class w/ method cyclomatic metrics', () =>
            {
               report.createScope('class', 100, 200);
               report.createScope('method', 100, 200, 0);

               report.incrementCyclomatic(50);

               assert.strictEqual(report.aggregate.cyclomatic, 51);
               assert.strictEqual(report.classes[0].aggregate.cyclomatic, 51);
               assert.strictEqual(report.classes[0].methods[0].cyclomatic, 51);
            });
         });

         suite('incrementLogicalSloc:', () =>
         {
            let report;

            setup(() => { report = new ModuleReport(10, 100); });
            teardown(() => { report = undefined; });

            test('report has correct class w/ method sloc metrics', () =>
            {
               report.createScope('class', 100, 200);
               report.createScope('method', 100, 200, 0);

               report.incrementLogicalSloc(50);

               assert.strictEqual(report.aggregate.sloc.logical, 50);
               assert.strictEqual(report.classes[0].aggregate.sloc.logical, 50);
               assert.strictEqual(report.classes[0].methods[0].sloc.logical, 50);
            });
         });

         suite('sumMetrics:', () =>
         {
            test('correct sum values collected', () =>
            {
               const report = new ModuleReport(10, 100);

               report.cyclomatic = 10;
               report.effort = 20;
               report.loc = 30;
               report.maintainability = 40;
               report.params = 50;

               const { sums, indices } = ModuleReport.getMaintainabilityMetrics();

               report.sumMetrics(sums, indices);
               report.sumMetrics(sums, indices);

               assert.strictEqual(sums[indices.cyclomatic], 20);
               assert.strictEqual(sums[indices.effort], 40);
               assert.strictEqual(sums[indices.loc], 60);
               assert.strictEqual(sums[indices.maintainability], 80);
               assert.strictEqual(sums[indices.params], 100);
            });
         });
      });

      suite('AbstractReport:', () =>
      {
         let report;

         setup(() => { report = new ModuleReport(10, 100); });
         teardown(() => { report = undefined; });

         test('report aggregate has correct params count', () =>
         {
            report.incrementParams(20);
            assert.strictEqual(report.aggregate.params, 20);
         });
      });

      suite('HalsteadData:', () =>
      {
         let report;

         setup(() => { report = new ModuleReport(10, 100); });
         teardown(() => { report = undefined; });

         test('report aggregate halstead data is reset', () =>
         {
            report.aggregate.halstead.bugs = 1000;
            report.aggregate.halstead.operands.distinct = 1000;
            report.aggregate.halstead.operands.identifiers.push('test');
            report.aggregate.halstead.reset(true);
            assert.strictEqual(report.aggregate.halstead.bugs, 0);
            assert.strictEqual(report.aggregate.halstead.operands.distinct, 0);
            assert.lengthOf(report.aggregate.halstead.operands.identifiers, 0);
         });
      });

      suite('MethodReport:', () =>
      {
         let report;

         setup(() => { report = new ModuleReport(10, 100); });
         teardown(() => { report = undefined; });

         test('MethodReport has correct static maintainability metric data', () =>
         {
            const { sums, indices } = MethodReport.getMaintainabilityMetrics();

            assert.isArray(sums);
            assert.isObject(indices);

            assert.lengthOf(sums, 4);

            assert.strictEqual(indices.cyclomatic, 0);
            assert.strictEqual(indices.effort, 1);
            assert.strictEqual(indices.loc, 2);
            assert.strictEqual(indices.params, 3);
         });

         test('MethodReport sumMetrics is correct', () =>
         {
            const { sums, indices } = MethodReport.getMaintainabilityMetrics();

            report.aggregate.cyclomatic = 10;
            report.aggregate.halstead.effort = 20;
            report.aggregate.sloc.logical = 30;
            report.aggregate.params = 40;

            report.aggregate.sumMetrics(sums, indices);
            report.aggregate.sumMetrics(sums, indices);

            assert.strictEqual(sums[0], 20);
            assert.strictEqual(sums[1], 40);
            assert.strictEqual(sums[2], 60);
            assert.strictEqual(sums[3], 80);
         });
      });
   });
}