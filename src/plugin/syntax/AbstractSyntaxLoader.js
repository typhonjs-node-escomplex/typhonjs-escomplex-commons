'use strict';

/**
 * Provides the base implementation for all syntax loader plugins which automatically associates member methods
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

      for (const name of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))
      {
         // Skip constructor & onLoadSyntax methods.
         if (!(this[name] instanceof Function) || name === 'constructor' || name === 'onLoadSyntax') { continue; }

         syntaxes[name] = this[name](ev.data.settings);
      }

      ev.data.syntaxes = syntaxes;
   }
}