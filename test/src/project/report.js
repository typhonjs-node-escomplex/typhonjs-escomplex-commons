import { assert }       from 'chai';

import ModuleReport     from '../../../src/module/report/ModuleReport';
import ProjectReport    from '../../../src/project/report/ProjectReport';

import * as testconfig  from '../testconfig';

if (testconfig.modules['projectReport'])
{
   suite('result:', () =>
   {
      suite('ProjectReport:', () =>
      {
         suite('instantiation:', () =>
         {
            let result;

            setup(() =>
            {
               const report = new ModuleReport(10, 100);
               const report2 = new ModuleReport(10, 100);
               const report3 = new ModuleReport(10, 100);

               report.srcPath = './c.js';
               report2.srcPath = './a.js';
               report3.srcPath = './b.js';

               report.createScope('method', 100, 200);
               report.popScope('method');
               report.createScope('class', 100, 200);
               report.createScope('method', 100, 200);
               report.popScope('method');
               report.popScope('class');

               result = new ProjectReport([report, report2, report3]);

               // Fake the adjacency / visibility lists; a depends on b / b depends on a / c depends on a & b
               result.adjacencyList = [{ row: 0, cols: [1] }, { row: 1, cols: [0] }, { row: 2, cols: [0, 1] }];
               result.visibilityList = [{ row: 0, cols: [2] }, { row: 1, cols: [0] }, { row: 2, cols: [0, 1, 2] }];
            });

            teardown(() => { result = undefined; });

            test('result has correct number of reports', () =>
            {
               assert.lengthOf(result.modules, 3);
            });

            test('result has correct report `srcPath` order', () =>
            {
               assert.strictEqual(result.modules[0].srcPath, './a.js');
               assert.strictEqual(result.modules[1].srcPath, './b.js');
               assert.strictEqual(result.modules[2].srcPath, './c.js');
            });

            test('finalize removes private data', () =>
            {
               assert.isArray(result.modules[2]._scopeStackClass);
               assert.isArray(result.modules[2]._scopeStackMethod);

               result.finalize();

               assert.isUndefined(result.modules[2]._scopeStackClass);
               assert.isUndefined(result.modules[2]._scopeStackMethod);
            });

            test('finalize w/ serializeModules === false is correct', () =>
            {
               const report = new ModuleReport(10, 100);
               report.srcPath = './a.js';
               result = new ProjectReport([report], { serializeModules: false });

               assert.isNotArray(result.modules[0]._scopeStackClass);
               assert.isNotArray(result.modules[0]._scopeStackMethod);

               result.finalize();

               assert.isObject(result.modules[0]);

               const reportKeys = Object.keys(result.modules[0]);

               assert.lengthOf(reportKeys, 3);
               assert.strictEqual(reportKeys[0], 'filePath');
               assert.strictEqual(reportKeys[1], 'srcPath');
               assert.strictEqual(reportKeys[2], 'srcPathAlias');

               assert.isUndefined(result.modules[0].filePath);
               assert.strictEqual(result.modules[0].srcPath, './a.js');
               assert.isUndefined(result.modules[0].srcPathAlias);
            });
         });

         suite('project with errors', () =>
         {
            const largeProjectJSON = require(
             'typhonjs-escomplex-test-data/files/large-project/json/project-with-errors');

            let projectReport;

            setup(() => { projectReport = ProjectReport.parse(largeProjectJSON); });

            teardown(() => { projectReport = void 0; });

            test('getErrors count is correct', () =>
            {
               const errors = projectReport.getErrors();

               assert.lengthOf(errors, 154);

/*
               console.log('!!!! getErrors - errors: ' + JSON.stringify(errors));

               errors.forEach((error) =>
               {
                  // console.log('!!! - result error: ' + JSON.stringify(error));
                  console.log('\n!!! - result error: ' + error.error);
                  console.log('!!! - result source: ' + (typeof error.source !== 'undefined' ? error.source.getName() : 'undefined'));
                  console.log('!!! - result class: ' + (typeof error.class !== 'undefined' ? error.class.getName() : 'undefined'));
                  console.log('!!! - result module: ' + (typeof error.module !== 'undefined' ? error.module.getName() : 'undefined'));
               });
*/
            });

            test('getErrors (only warnings) count is correct', () =>
            {
               const errors = projectReport.getErrors({ query: { severity: 'warning' } });

               assert.lengthOf(errors, 38);

/*
               console.log('!!!! getErrors - errors: ' + JSON.stringify(errors));

               errors.forEach((error) =>
               {
                  // console.log('!!! - result error: ' + JSON.stringify(error));
                  console.log('\n!!! - result error: ' + error.error);
                  console.log('!!! - result source: ' + (typeof error.source !== 'undefined' ? error.source.getName() : 'undefined'));
                  console.log('!!! - result class: ' + (typeof error.class !== 'undefined' ? error.class.getName() : 'undefined'));
                  console.log('!!! - result module: ' + (typeof error.module !== 'undefined' ? error.module.getName() : 'undefined'));
               });
*/
            });
         });

         suite('large project parsing performance', () =>
         {
            const largeProjectJSON = require('typhonjs-escomplex-test-data/files/large-project/json/project');

            test('deserialize JSON object should be sufficiently fast', function()
            {
               this.timeout(75);
               ProjectReport.parse(largeProjectJSON);
            });
         });
      });
   });
}