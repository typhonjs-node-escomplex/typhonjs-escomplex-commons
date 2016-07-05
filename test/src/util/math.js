import { assert }    from 'chai';

import MathUtil  from '../../../src/utils/MathUtil';

suite('utils:', () =>
{
   suite('MathUtil', () =>
   {
      suite('compactMatrix:', () =>
      {
         test('matrix is compacted', () =>
         {
            let matrix = MathUtil.create2DArray(4, 0);
            matrix[0][0] = 1;
            matrix[1][1] = 1;
            matrix[2][2] = 1;
            matrix[3][3] = 1;

            assert.strictEqual(JSON.stringify(MathUtil.compactMatrix(matrix)), '[[0],[1],[2],[3]]');

            matrix = MathUtil.create2DArray(4, 0);
            matrix[0][0] = 1;
            matrix[0][2] = 1;
            matrix[1][1] = 1;
            matrix[1][3] = 1;
            matrix[2][0] = 1;
            matrix[2][1] = 1;
            matrix[2][2] = 1;
            matrix[2][3] = 1;

            assert.strictEqual(JSON.stringify(MathUtil.compactMatrix(matrix)), '[[0,2],[1,3],[0,1,2,3],[]]');
         });
      });

      suite('getMedian:', () =>
      {
         test('median is returned', () =>
         {
            assert.strictEqual(MathUtil.getMedian([100, 20, 80, 60, 50]), 60);
            assert.strictEqual(MathUtil.getMedian([100, 20, 80, 60, 50, 120]), 70);
         });
      });

      suite('getPercent:', () =>
      {
         test('percent is returned', () =>
         {
            assert.strictEqual(MathUtil.getPercent(.2, 1), 20);
            assert.strictEqual(MathUtil.getPercent(100, 1000), 10);
         });
      });
   });
});
