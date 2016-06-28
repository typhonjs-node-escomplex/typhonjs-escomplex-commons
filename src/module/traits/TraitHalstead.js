'use strict';

/**
 * Provides a wrapper around a data object hash which should contain an `identifier` field and potentially a `filter`
 * field.
 */
export default class TraitHalstead
{
   /**
    * Initializes the Halstead trait.
    *
    * @param {object}   data - The data field to be wrapped.
    */
   constructor(data)
   {
      this._data = data;
   }

   /**
    * Returns the value of the `filter` field of the wrapped data. If the wrapped `filter` field is a function it
    * is invoked with the given `params` otherwise the data is returned directly. If `filter` is not defined then
    * `true` is returned.
    *
    * @param {*}  params - Provides parameters which are forwarded onto any data stored as a function.
    *
    * @returns {boolean}
    */
   filter(...params)
   {
      return typeof this._data === 'object' && this._data.filter ?
       typeof this._data.filter === 'function' ? this._data.filter(...params) : this._data.filter : true;
   }

   /**
    * Returns the typeof data being wrapper.
    *
    * @returns {string}
    */
   get type() { return typeof this._data; }

   /**
    * Returns the value of the `identifier` field of the wrapped data. If the wrapped `identifier` field is a function
    * it is invoked with the given `params` otherwise the data is returned directly.
    *
    * @param {*}  params - Provides parameters which are forwarded onto any data stored as a function.
    *
    * @returns {*}
    */
   valueOf(...params)
   {
      return typeof this._data === 'object' && this._data.identifier ?
       typeof this._data.identifier === 'function' ? this._data.identifier(...params) : this._data.identifier : void 0;
   }
}
