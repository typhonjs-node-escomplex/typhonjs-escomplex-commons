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

   static safeStringObject(string, object, accessor, newLine = 1, appendString = '')
   {
      if (typeof object !== 'object') { return ''; }

      const access = accessor.split('.');

      // Walk through the given object by the accessor indexes.
      for (let cntr = 0; cntr < access.length; cntr++)
      {
         // If the next level of object access is undefined or null then return the empty string.
         if (typeof object[access[cntr]] === 'undefined' || object[access[cntr]] === null) { return ''; }

         object = object[access[cntr]];
      }

      let end = '\n';

      // Create the ending new line result if it is not the default of `1`.
      if (newLine === 0 || newLine > 1) { end = new Array(newLine + 1).join('\n'); }

      return `${string}${object}${appendString}${end}`;
   }

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