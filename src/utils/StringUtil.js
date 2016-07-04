export default class StringUtil
{
   /**
    * Compares two paths.
    *
    * @param {string}   lhs - Left-hand side.
    * @param {string}   rhs - Right-hand side.
    *
    * @returns {number}
    * @private
    */
   static comparePaths(lhs, rhs)
   {
      const localeLHS = lhs.toLocaleLowerCase();
      const localeRHS = rhs.toLocaleLowerCase();

      if (localeLHS < localeRHS) { return -1; }

      if (localeLHS > localeRHS) { return 1; }

      return 0;
   }
}