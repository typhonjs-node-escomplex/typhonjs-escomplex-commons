import fs               from 'fs-extra';
import { assert }       from 'chai';

import ModuleReport     from '../../../src/module/report/ModuleReport';
import ProjectResult    from '../../../src/project/result/ProjectResult';
import TransformFormat  from '../../../src/transform/TransformFormat';

import * as testconfig  from '../testconfig';

// Uncomment to generate matching format test data.
// generateFormatData();
runTests();

/**
 * Runs the tests
 */
function runTests()
{
   if (testconfig.modules['transformFormat'])
   {
      suite('transform:', () =>
      {
         suite('TransformFormat:', () =>
         {
            suite('forEach / formatModule (large-module/report):', () =>
            {
               const largeModuleJSON = require('typhonjs-escomplex-test-data/files/large-module/report/report');

               const moduleReport = ModuleReport.parse(largeModuleJSON);

               TransformFormat.forEach((format, formatName) =>
               {
                  if (TransformFormat.isSupported(formatName, moduleReport.type))
                  {
                     test(`formatName: ${formatName}`, () =>
                     {
                        const output = format.formatReport(moduleReport);

                        const original = fs.readFileSync(
                         `./test/fixture/files/large-module/report-${formatName}.${format.extension}`, 'utf8');

                        assert.strictEqual(output, original);
                     });
                  }
               });
            });

            suite('forEach / formatProject (large-project/results):', () =>
            {
               const largeProjectJSON = require(
                'typhonjs-escomplex-test-data/files/large-project/results/results-no-reports');

               const projectResult = ProjectResult.parse(largeProjectJSON);

               TransformFormat.forEach((format, formatName) =>
               {
                  if (TransformFormat.isSupported(formatName, projectResult.type))
                  {
                     test(`formatName: ${formatName}`, () =>
                     {
                        const output = format.formatReport(projectResult);

                        const original = fs.readFileSync(
                         `./test/fixture/files/large-project/results-no-reports-${formatName}.${format.extension}`,
                          'utf8');

                        assert.strictEqual(output, original);
                     });
                  }
               });
            });
         });

         suite('ModuleReport:', () =>
         {
            suite('toFormat (large-module/report):', () =>
            {
               const largeModuleJSON = require('typhonjs-escomplex-test-data/files/large-module/report/report');

               const moduleReport = ModuleReport.parse(largeModuleJSON);

               ModuleReport.getFormats().forEach((format) =>
               {
                  test(`formatName: ${format.name}`, () =>
                  {
                     const output = moduleReport.toFormat(format.name);

                     const original = fs.readFileSync(
                      `./test/fixture/files/large-module/report-${format.name}.${format.extension}`, 'utf8');

                     assert.strictEqual(output, original);
                  });
               });
            });

            suite('toFormat (large-module/report-with-errors):', () =>
            {
               const largeModuleJSON = require(
                'typhonjs-escomplex-test-data/files/large-module/report/report-with-errors');

               const moduleReport = ModuleReport.parse(largeModuleJSON);

               ModuleReport.getFormats().forEach((format) =>
               {
                  test(`formatName: ${format.name}`, () =>
                  {
                     const output = moduleReport.toFormat(format.name);

                     const original = fs.readFileSync(
                      `./test/fixture/files/large-module/report-with-errors-${format.name}.${format.extension}`,
                       'utf8');

                     assert.strictEqual(output, original);
                  });
               });
            });
         });

         suite('ProjectResult:', () =>
         {
            suite('toFormat (large-project/results):', () =>
            {
               const largeProjectJSON = require('typhonjs-escomplex-test-data/files/large-project/results/results');

               const projectResult = ProjectResult.parse(largeProjectJSON);

               ProjectResult.getFormats().forEach((format) =>
               {
                  test(`formatName: ${format.name}`, () =>
                  {
                     const output = projectResult.toFormat(format.name);

                     const original = fs.readFileSync(
                      `./test/fixture/files/large-project/result-${format.name}.${format.extension}`, 'utf8');

                     assert.strictEqual(output, original);
                  });
               });
            });

            suite('toFormat (large-project/results-no-reports):', () =>
            {
               const largeProjectJSON = require(
                'typhonjs-escomplex-test-data/files/large-project/results/results-no-reports');

               const projectResult = ProjectResult.parse(largeProjectJSON);

               ProjectResult.getFormats().forEach((format) =>
               {
                  test(`formatName: ${format.name}`, () =>
                  {
                     const output = projectResult.toFormat(format.name);

                     const original = fs.readFileSync(
                      `./test/fixture/files/large-project/results-no-reports-${format.name}.${format.extension}`,
                       'utf8');

                     assert.strictEqual(output, original);
                  });
               });
            });

            suite('toFormat (large-project/results-with-errors):', () =>
            {
               const largeProjectJSON = require(
                'typhonjs-escomplex-test-data/files/large-project/results/results-with-errors');

               const projectResult = ProjectResult.parse(largeProjectJSON);

               ProjectResult.getFormats().forEach((format) =>
               {
                  test(`formatName: ${format.name}`, () =>
                  {
                     const output = projectResult.toFormat(format.name);

                     const original = fs.readFileSync(
                      `./test/fixture/files/large-project/results-with-errors-${format.name}.${format.extension}`,
                       'utf8');

                     assert.strictEqual(output, original);
                  });
               });
            });
         });
      });
   }
}

/**
 * Generates the original module report / project result test data.
 */
/*
function generateFormatData()
{
   // Empty formatted result / report matching test data.
   fs.emptyDirSync('./test/fixture/files/large-module');
   fs.emptyDirSync('./test/fixture/files/large-project');

   // Generate project result formatted test data.

   const largeModuleJSON = require('typhonjs-escomplex-test-data/files/large-module/report/report');
   const moduleReport = ModuleReport.parse(largeModuleJSON).finalize();

   ModuleReport.getFormats().forEach((format) =>
   {
      test(`generate formatName: ${format.name}`, () =>
      {
         const output = format.formatReport(moduleReport);

         fs.writeFileSync(
          `./test/fixture/files/large-module/report-${format.name}.${format.extension}`, output, 'utf8');
      });
   });

   const largeModuleJSON2 = require('typhonjs-escomplex-test-data/files/large-module/report/report-with-errors');
   const moduleReport2 = ModuleReport.parse(largeModuleJSON2).finalize();

   ModuleReport.getFormats().forEach((format) =>
   {
      test(`generate formatName: ${format.name}`, () =>
      {
         const output = format.formatReport(moduleReport2);

         fs.writeFileSync(
          `./test/fixture/files/large-module/report-with-errors-${format.name}.${format.extension}`, output, 'utf8');
      });
   });

   // Generate module report formatted test data.

   const largeProjectJSON = require('typhonjs-escomplex-test-data/files/large-project/results/results');
   const projectResult = ProjectResult.parse(largeProjectJSON).finalize();

   ProjectResult.getFormats().forEach((format) =>
   {
      test(`generate formatName: ${format.name}`, () =>
      {
         const output = format.formatReport(projectResult);

         fs.writeFileSync(
          `./test/fixture/files/large-project/result-${format.name}.${format.extension}`, output, 'utf8');
      });
   });

   const largeProjectJSON2 = require('typhonjs-escomplex-test-data/files/large-project/results/results-no-reports');
   const projectResult2 = ProjectResult.parse(largeProjectJSON2).finalize();

   ProjectResult.getFormats().forEach((format) =>
   {
      test(`generate formatName: ${format.name}`, () =>
      {
         const output = format.formatReport(projectResult2);

         fs.writeFileSync(
          `./test/fixture/files/large-project/results-no-reports-${format.name}.${format.extension}`, output, 'utf8');
      });
   });

   const largeProjectJSON3 = require('typhonjs-escomplex-test-data/files/large-project/results/results-with-errors');
   const projectResult3 = ProjectResult.parse(largeProjectJSON3).finalize();

   ProjectResult.getFormats().forEach((format) =>
   {
      test(`generate formatName: ${format.name}`, () =>
      {
         const output = format.formatReport(projectResult3);

         fs.writeFileSync(
          `./test/fixture/files/large-project/results-with-errors-${format.name}.${format.extension}`, output, 'utf8');
      });
   });
}
*/