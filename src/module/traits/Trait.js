'use strict';

export default class Trait
{
   constructor(data)
   {
      this._data = data;
   }

   get type() { return typeof this._data; }

   valueOf(...params)
   {
      if (Array.isArray(this._data))
      {
         return this._data.map((entry) => { return typeof entry === 'function' ? entry(...params) : entry; });
      }

      return typeof this._data === 'function' ? this._data(...params) : this._data;
   }
}
