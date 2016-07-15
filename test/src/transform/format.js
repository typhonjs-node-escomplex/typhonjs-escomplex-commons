import fs               from 'fs-extra';
import { assert }       from 'chai';

import ModuleReport     from '../../../src/module/report/ModuleReport';
import ProjectResult    from '../../../src/project/result/ProjectResult';
import TransformFormat  from '../../../src/transform/TransformFormat';

// Uncomment to generate matching format test data.
// generateFormatData();

suite('transform:', () =>
{
   suite('TransformFormat:', () =>
   {
      suite('forEach / formatReport (large-module/report):', () =>
      {
         const largeModuleJSON = require('typhonjs-escomplex-test-data/files/large-module/report/report');

         const moduleReport = ModuleReport.parse(largeModuleJSON).finalize();

         TransformFormat.forEach((format, formatType) =>
         {
            test(`formatType: ${formatType}`, () =>
            {
               const output = format.formatReport(moduleReport);

               const original = fs.readFileSync(
                `./test/fixture/files/large-module/report-${formatType}.${format.extension}`, 'utf8');

               assert.strictEqual(output, original);
            });
         });
      });

      suite('forEach / formatResult (large-module/report):', () =>
      {
         const largeProjectJSON = require('typhonjs-escomplex-test-data/files/large-project/results/results-no-reports');

         const projectResult = ProjectResult.parse(largeProjectJSON).finalize();

         TransformFormat.forEach((format, formatType) =>
         {
            test(`formatType: ${formatType}`, () =>
            {
               const output = format.formatResult(projectResult);

               // Generate original test data.
               // fs.writeFileSync(
               //  `./test/fixture/files/large-project/results-no-reports-${formatType}.${format.extension}`, output, 'utf8');

               const original = fs.readFileSync(
                `./test/fixture/files/large-project/results-no-reports-${formatType}.${format.extension}`, 'utf8');

               assert.strictEqual(output, original);
            });
         });
      });
   });
});

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

   TransformFormat.forEach((format, formatType) =>
   {
      test(`formatType: ${formatType}`, () =>
      {
         const output = format.formatReport(moduleReport);

         fs.writeFileSync(
          `./test/fixture/files/large-module/report-${formatType}.${format.extension}`, output, 'utf8');
      });
   });

   // Generate module report formatted test data.

   let largeProjectJSON = require('typhonjs-escomplex-test-data/files/large-project/results/results');

   let projectResult = ProjectResult.parse(largeProjectJSON).finalize();

   TransformFormat.forEach((format, formatType) =>
   {
      test(`formatType: ${formatType}`, () =>
      {
         const output = format.formatResult(projectResult);

         fs.writeFileSync(
          `./test/fixture/files/large-project/result-${formatType}.${format.extension}`, output, 'utf8');
      });
   });


   largeProjectJSON = require('typhonjs-escomplex-test-data/files/large-project/results/results-no-reports');

   projectResult = ProjectResult.parse(largeProjectJSON).finalize();

   TransformFormat.forEach((format, formatType) =>
   {
      test(`formatType: ${formatType}`, () =>
      {
         const output = format.formatResult(projectResult);

         fs.writeFileSync(
          `./test/fixture/files/large-project/results-no-reports-${formatType}.${format.extension}`, output, 'utf8');
      });
   });
}
*/