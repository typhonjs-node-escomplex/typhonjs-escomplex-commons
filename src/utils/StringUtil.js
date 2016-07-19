import ObjectUtil from './ObjectUtil';

/**
 * Provides common string utilities.
 */
export default class StringUtil
{
   /**
    * Compares two strings.
    *
    * @param {string}   lhs - Left-hand side.
    * @param {string}   rhs - Right-hand side.
    *
    * @returns {number}
    */
   static compare(lhs, rhs)
   {
      return lhs.toLowerCase().localeCompare(rhs.toLowerCase());
   }

   /**
    * Increments the indentation amount.
    *
    * @param {number}   indentation - Current indentation amount.
    * @param {number}   amount - (Optional) indentation amount; default: 3.
    *
    * @returns {number}
    */
   static incrementIndent(indentation, amount = 3)
   {
      return indentation + amount;
   }

   /**
    * Creates an indentation string given the indentation amount.
    *
    * @param {number}   indentation - Current indentation amount.
    * @param {string}   string - A string to append.
    *
    * @returns {string}
    */
   static indent(indentation, string = '')
   {
      return (new Array(indentation + 1)).join(' ') + string;
   }

   /**
    * Provides a way to output a given string value with concatenated data from safely accessing an objects data /
    * entries given an accessor string which describes the entries to walk. To access deeper entries into the object
    * format the accessor string with `.` between entries to walk.
    *
    * @param {string}   string - A string to prepend to the object data received.
    * @param {object}   object - An object to access entry data.
    * @param {string}   accessor - A string describing the entries to access.
    * @param {number}   newLine - (Optional) A number of new line characters to append; default: `1`.
    * @param {string}   appendString - (Optional) A string to potentially append; default: `''`;
    *
    * @returns {string}
    */
   static safeStringObject(string, object, accessor, newLine = 1, appendString = '')
   {
      const value = ObjectUtil.safeAccess(object, accessor);

      if (typeof value === 'undefined') { return ''; }

      let end = '\n';

      // Create the ending new line result if it is not the default of `1`.
      if (newLine === 0 || newLine > 1) { end = new Array(newLine + 1).join('\n'); }

      return `${string}${value}${appendString}${end}`;
   }

   /**
    * Provides a convenience method producing a block of safeStringObject results.
    *
    * @param {object}         object - An object to access entry data.
    *
    * @param {Array<Array>}   array - An array of arrays with each entry composed of entries to forward onto
    *                                 `safeStringObject`. The indexes correspond to the following:
    * ```
    * [0] (string) - The string to prepend.
    * [1] (string) - The accessor string describing the lookup operation.
    * [2] (number) - (Optional) The number of newlines characters to append.
    * [3] (string) - (Optional) A string to append to the end.
    * ```
    *
    * @returns {string}
    */
   static safeStringsObject(object, ...array)
   {
      if (typeof object !== 'object') { return ''; }

      const output = [];

      for (let cntr = 0; cntr < array.length; cntr++)
      {
         const entry = array[cntr];

         // Process array entry otherwise simply append `entry` to output.
         if (Array.isArray(entry))
         {
            switch (entry.length)
            {
               case 2:
                  output.push(StringUtil.safeStringObject(entry[0], object, entry[1]));
                  break;

               case 3:
                  output.push(StringUtil.safeStringObject(entry[0], object, entry[1], entry[2]));
                  break;

               case 4:
                  output.push(StringUtil.safeStringObject(entry[0], object, entry[1], entry[2], entry[3]));
                  break;

               default:
                  throw new Error(
                   `safeStringsObject error: entry at '${cntr}' has the wrong length '${entry.length}'.`);
            }
         }
         else
         {
            output.push(entry);
         }
      }

      return output.join('');
   }
}