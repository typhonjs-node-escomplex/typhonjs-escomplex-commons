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
}