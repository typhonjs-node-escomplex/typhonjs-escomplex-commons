'use strict';

import { assert }             from 'chai';

import AbstractSyntaxLoader   from '../../src/plugin/syntax/AbstractSyntaxLoader.js';

class Parent extends AbstractSyntaxLoader
{
   ParentOne() { return {}; }
   ParentTwo() { return {}; }
}

class Child extends Parent
{
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
         const event = { data: { settings: {} } };
         instance.onLoadSyntax(event);

         assert.isObject(event.data.syntaxes['ChildThree']);
         assert.isObject(event.data.syntaxes['ChildFour']);
         assert.isObject(event.data.syntaxes['ParentOne']);
         assert.isObject(event.data.syntaxes['ParentTwo']);
      });
   });
});
