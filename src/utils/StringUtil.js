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
    * @param {function} tagFunction - (Optional) A template tag function to apply; default: `void 0`;
    *
    * @returns {string}
    */
   static safeStringObject(string, object, accessor, newLine = 1, appendString = '', tagFunction = void 0)
   {
      const value = ObjectUtil.safeAccess(object, accessor);

      if (typeof value === 'undefined') { return ''; }

      let end = '\n';

      // Create the ending new line result if it is not the default of `1`.
      if (newLine === 0 || newLine > 1) { end = new Array(newLine + 1).join('\n'); }

      return typeof tagFunction === 'function' ? tagFunction`${string}${value}${appendString}${end}` :
       `${string}${value}${appendString}${end}`;
   }

   /**
    * Provides a convenience method producing a block of safeStringObject results.
    *
    * @param {object}         object - An object to access entry data.
    *
    * @param {string|Array<string|number|function>}  entries -
    *                                  Multiple arrays or strings. If the entry is not an array it will simply
    *                                  be appended. If the entry is an array then entries in this array correspond
    *                                  to the following parameters which are forwarded onto `safeStringObject`.
    *                                  The indexes correspond to the following:
    * ```
    * [0] (string) - The string to prepend.
    * [1] (string) - The accessor string describing the lookup operation.
    * [2] (number) - (Optional) The number of newlines characters to append.
    * [3] (string) - (Optional) A string to append to the end.
    * [4] (function) - (Optional) A template tag function to apply.
    * ```
    *
    * @returns {string}
    */
   static safeStringsObject(object, ...entries)
   {
      return StringUtil.safeStringsPrependObject('', object, ...entries);
   }

   static safeStringsPrependObject(prepend, object, ...entries)
   {
      if (typeof object !== 'object') { return ''; }

      const output = [];

      for (let cntr = 0; cntr < entries.length; cntr++)
      {
         const entry = entries[cntr];

         // Process an array entry otherwise simply append `entry` to output if it is a string.
         if (Array.isArray(entry))
         {
            switch (entry.length)
            {
               case 2:
                  output.push(StringUtil.safeStringObject(`${prepend}${entry[0]}`, object, entry[1]));
                  break;

               case 3:
                  output.push(StringUtil.safeStringObject(`${prepend}${entry[0]}`, object, entry[1], entry[2]));
                  break;

               case 4:
                  output.push(
                   StringUtil.safeStringObject(`${prepend}${entry[0]}`, object, entry[1], entry[2], entry[3]));
                  break;

               case 5:
                  output.push(StringUtil.safeStringObject(`${prepend}${entry[0]}`,
                   object, entry[1], entry[2], entry[3], entry[4]));
                  break;

               default:
                  throw new Error(
                   `safeStringsPrependObject error: entry at '${cntr}' has the wrong length '${entry.length}'.`);
            }
         }
         else if (typeof entry === 'string')
         {
            output.push(`${prepend}${entry}`);
         }
      }

      return output.join('');
   }

   /**
    * Provides a tagged template method to escape HTML elements.
    *
    * @param {Array<string>}  literal - Literal components of template string.
    * @param {Array<*>}       values - Values to substitute.
    *
    * @returns {string}
    */
   static tagEscapeHTML(literal, ...values)
   {
      return values.reduce((previous, value, index) =>
      {
         return previous + String(value).replace('<', '&lt;').replace('>', '&gt;') + literal[index + 1];
      }, literal[0]);
   }
}