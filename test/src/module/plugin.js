import { assert }             from 'chai';

import AbstractSyntaxLoader   from '../../../src/module/plugin/syntax/AbstractSyntaxLoader';

class Parent extends AbstractSyntaxLoader
{
   ParentOne() { return {}; }
   ParentTwo() { return {}; }
}

class Child extends Parent
{
   onConfigure() { return {}; } // This is ignored by AbstractSyntaxLoader.
   ChildThree() { return {}; }
   ChildFour() { return {}; }
}

suite('plugin:', () =>
{
   /**
    * Verifies that AbstractSyntaxLoader can find all child / parent inheritance methods
    */
   suite('syntax (AbstractSyntaxLoader):', () =>
   {
      const instance = new Child();

      test('verify child / parent syntax loading', () =>
      {
         const event = { data: { settings: {}, syntaxes: {} } };
         instance.onLoadSyntax(event);

         assert.isUndefined(event.data.syntaxes['onConfigure']);

         assert.isObject(event.data.syntaxes['ChildThree']);
         assert.isObject(event.data.syntaxes['ChildFour']);
         assert.isObject(event.data.syntaxes['ParentOne']);
         assert.isObject(event.data.syntaxes['ParentTwo']);
      });
   });
});
