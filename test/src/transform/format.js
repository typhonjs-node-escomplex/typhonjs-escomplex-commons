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
            suite('forEach / formatReport (large-module/report):', () =>
            {
               const largeModuleJSON = require('typhonjs-escomplex-test-data/files/large-module/report/report');

               const moduleReport = ModuleReport.parse(largeModuleJSON).finalize();

               TransformFormat.forEach((format, formatName) =>
               {
                  test(`formatName: ${formatName}`, () =>
                  {
                     const output = format.formatReport(moduleReport);

                     const original = fs.readFileSync(
                      `./test/fixture/files/large-module/report-${formatName}.${format.extension}`, 'utf8');

                     assert.strictEqual(output, original);
                  });
               });
            });

            suite('forEach / formatResult (large-module/report):', () =>
            {
               const largeProjectJSON = require(
                'typhonjs-escomplex-test-data/files/large-project/results/results-no-reports');

               const projectResult = ProjectResult.parse(largeProjectJSON).finalize();

               TransformFormat.forEach((format, formatName) =>
               {
                  test(`formatName: ${formatName}`, () =>
                  {
                     const output = format.formatResult(projectResult);

                     const original = fs.readFileSync(
                      `./test/fixture/files/large-project/results-no-reports-${formatName}.${format.extension}`,
                       'utf8');

                     assert.strictEqual(output, original);
                  });
               });
            });
         });

         suite('ModuleReport:', () =>
         {
            suite('toFormat (large-module/report):', () =>
            {
               const largeModuleJSON = require('typhonjs-escomplex-test-data/files/large-module/report/report');

               const moduleReport = ModuleReport.parse(largeModuleJSON).finalize();

               const extensions = ModuleReport.getFormatFileExtensions();

               ModuleReport.getFormatNames().forEach((formatName, index) =>
               {
                  test(`formatName: ${formatName}`, () =>
                  {
                     const output = moduleReport.toFormat(formatName);

                     const original = fs.readFileSync(
                      `./test/fixture/files/large-module/report-${formatName}.${extensions[index]}`, 'utf8');

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

               const projectResult = ProjectResult.parse(largeProjectJSON).finalize();

               const extensions = ProjectResult.getFormatFileExtensions();

               ProjectResult.getFormatNames().forEach((formatName, index) =>
               {
                  test(`formatName: ${formatName}`, () =>
                  {
                     const output = projectResult.toFormat(formatName);

                     const original = fs.readFileSync(
                      `./test/fixture/files/large-project/result-${formatName}.${extensions[index]}`, 'utf8');

                     assert.strictEqual(output, original);
                  });
               });
            });

            suite('toFormat (large-project/results-no-reports):', () =>
            {
               const largeProjectJSON = require(
                'typhonjs-escomplex-test-data/files/large-project/results/results-no-reports');

               const projectResult = ProjectResult.parse(largeProjectJSON).finalize();

               const extensions = ProjectResult.getFormatFileExtensions();

               ProjectResult.getFormatNames().forEach((formatName, index) =>
               {
                  test(`formatName: ${formatName}`, () =>
                  {
                     const output = projectResult.toFormat(formatName);

                     const original = fs.readFileSync(
                      `./test/fixture/files/large-project/results-no-reports-${formatName}.${extensions[index]}`,
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
   //fs.emptyDirSync('./test/fixture/files/large-module');
   //fs.emptyDirSync('./test/fixture/files/large-project');

   // Generate project result formatted test data.

   const largeModuleJSON = require('typhonjs-escomplex-test-data/files/large-module/report/report');
   const moduleReport = ModuleReport.parse(largeModuleJSON).finalize();

   TransformFormat.forEach((format, formatName) =>
   {
      test(`formatName: ${formatName}`, () =>
      {
         const output = format.formatReport(moduleReport);

         fs.writeFileSync(
          `./test/fixture/files/large-module/report-${formatName}.${format.extension}`, output, 'utf8');
      });
   });

   // Generate module report formatted test data.

   const largeProjectJSON = require('typhonjs-escomplex-test-data/files/large-project/results/results');
   const projectResult = ProjectResult.parse(largeProjectJSON).finalize();

   TransformFormat.forEach((format, formatName) =>
   {
      test(`formatName: ${formatName}`, () =>
      {
         const output = format.formatResult(projectResult);

         fs.writeFileSync(
          `./test/fixture/files/large-project/result-${formatName}.${format.extension}`, output, 'utf8');
      });
   });

   const largeProjectJSON2 = require('typhonjs-escomplex-test-data/files/large-project/results/results-no-reports');
   const projectResult2 = ProjectResult.parse(largeProjectJSON2).finalize();

   TransformFormat.forEach((format, formatName) =>
   {
      test(`formatName: ${formatName}`, () =>
      {
         const output = format.formatResult(projectResult2);

         fs.writeFileSync(
          `./test/fixture/files/large-project/results-no-reports-${formatName}.${format.extension}`, output, 'utf8');
      });
   });
}
*/