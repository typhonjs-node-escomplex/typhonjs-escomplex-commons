/**
 * Provides common object manipulation utilities.
 */
export default class ObjectUtil
{
   /**
    * Performs a naive depth traversal of an object / array. The data structure _must not_ have circular references.
    * The result of the callback function is used to modify in place the given data.
    *
    * @param {object|Array}   data - An object or array.
    * @param {function}       func - A callback function to process leaf values in children arrays or object members.
    *
    * @returns {*}
    */
   static depthTraverse(data, func)
   {
      /* istanbul ignore if */
      if (typeof data !== 'object') { throw new TypeError('depthTraverse error: \'data\' is not an \'object\'.'); }

      /* istanbul ignore if */
      if (typeof func !== 'function') { throw new TypeError('depthTraverse error: \'func\' is not a \'function\'.'); }

      return _depthTraverse(data, func);
   }
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Private implementation of depth traversal.
 *
 * @param {object|Array}   data - An object or array.
 * @param {function}       func - A callback function to process leaf values in children arrays or object members.
 *
 * @returns {*}
 * @private
 */
function _depthTraverse(data, func)
{
   if (Array.isArray(data))
   {
      for (let cntr = 0; cntr < data.length; cntr++) { data[cntr] = _depthTraverse(data[cntr], func); }
   }
   else if (typeof data === 'object')
   {
      for (const key in data) { if (data.hasOwnProperty(key)) { data[key] = _depthTraverse(data[key], func); } }
   }
   else
   {
      data = func(data);
   }

   return data;
}