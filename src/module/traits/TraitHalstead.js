'use strict';

export default class TraitHalstead
{
   constructor(data)
   {
      this._data = data;
   }

   filter(...params)
   {
      return typeof this._data === 'object' && this._data.filter ?
       typeof this._data.filter === 'function' ? this._data.filter(...params) : this._data.filter : true;
   }

   get type() { return typeof this._data; }

   valueOf(...params)
   {
      return typeof this._data === 'object' && this._data.identifier ?
       typeof this._data.identifier === 'function' ? this._data.identifier(...params) : this._data.identifier : void 0;
   }
}
