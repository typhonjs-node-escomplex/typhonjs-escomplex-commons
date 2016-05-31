'use strict';

/**
 * Provides the base implementation for all syntax loader plugins which automatically associates member methods
 * to syntax definitions invoking the method with escomplex settings and assigning the result to the same name as
 * the method.
 */
export default class AbstractSyntaxLoader
{
   /**
    * Loads all member methods including from child classes that are not `constructor` or `onLoadSyntax`.
    *
    * @param {object}   ev - escomplex plugin event data.
    */
   onLoadSyntax(ev)
   {
      const syntaxes = {};

      for (const name of s_GET_ALL_PROPERTY_NAMES(Object.getPrototypeOf(this)))
      {
         // Skip constructor method.
         if (!(this[name] instanceof Function) || name === 'constructor') { continue; }

         syntaxes[name] = this[name](ev.data.settings);
      }

      ev.data.syntaxes = syntaxes;
   }
}

/**
 * Walks an objects inheritance tree collecting property names stopping before `AbstractSyntaxLoader` is reached.
 *
 * @param {object}   obj - object to walks.
 * @returns {Array}
 */
const s_GET_ALL_PROPERTY_NAMES = (obj) =>
{
   const props = [];

   do
   {
      Object.getOwnPropertyNames(obj).forEach((prop) => { if (props.indexOf(prop) === -1) { props.push(prop); } });
      obj = Object.getPrototypeOf(obj);
   } while (typeof obj !== 'undefined' && obj !== null && !(obj === AbstractSyntaxLoader.prototype));

   return props;
};