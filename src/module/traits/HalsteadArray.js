'use strict';

import TraitHalstead from './TraitHalstead.js';

/**
 * Provides a wrapper around an array of Halstead properties object hash which should contain which should contain an
 * `identifier` field and potentially a `filter` field.
 */
export default class HalsteadArray
{
   /**
    * Initializes HalsteadArray by normalizing any Halstead properties coverting them into TraitHalstead instances.
    *
    * @param {Array}    data - An array of Halstead properties.
    * @param {string}   metric - The name of Halstead metric being stored.
    */
   constructor(data, metric)
   {
      /* istanbul ignore if */
      if (!Array.isArray(data)) { throw new TypeError('ctor error: data is not an `Array`.'); }

      /* istanbul ignore if */
      if (typeof metric !== 'string') { throw new TypeError('ctor error: metric is not a `string`.'); }

      /**
       * Stores an array of normalized Halstead property data to an object hash that has an `identifier` entry.
       * @type {Array<TraitHalstead>}
       * @private
       */
      this._data = data.map((property) =>
      {
         return property && typeof property.identifier !== 'undefined' ? new TraitHalstead(property) :
          new TraitHalstead({ identifier: property });
      });

      /**
       * Stores the Halstead metric type.
       * @type {string}
       * @private
       */
      this._metric = metric;
   }

   /**
    * Allows custom processing of TraitHalstead data.
    *
    * @param {function} method - A custom method to process each TraitHalstead data.
    */
   forEach(method)
   {
      this._data.forEach(method);
   }

   /**
    * Returns a TraitHalstead entry at the given index.
    *
    * @param {number}   index - Index to access.
    *
    * @returns {*}
    */
   get(index)
   {
      return this._data[index];
   }

   /**
    * Returns the length of wrapped TraitHalstead data.
    *
    * @returns {number}
    */
   get length() { return this._data.length; }

   /**
    * Returns the associated metric label.
    *
    * @returns {string}
    */
   get metric() { return this._metric; }

   /**
    * Processes all TraitHalstead data with the given report and current / parent AST nodes. If an Halstead identifier
    * is resolved and passes any associated filter test then add it to the report.
    *
    * @param {ModuleReport}   report - The ModuleReport being processed.
    * @param {object}         node - Current AST node.
    * @param {object}         parent - Parent AST node.
    */
   process(report, node = undefined, parent = undefined)
   {
      this._data.forEach((traitHalstead) =>
      {
         const identifier = traitHalstead.valueOf(node, parent);

         if (typeof identifier !== 'undefined' && traitHalstead.filter(node, parent))
         {
            // Handle the case when a halstead trait element is an array of identifiers.
            if (Array.isArray(identifier))
            {
               identifier.forEach((element) => { report.halsteadItemEncountered(this.metric, element); });
            }
            else
            {
               report.halsteadItemEncountered(this.metric, identifier);
            }
         }
      });
   }
}