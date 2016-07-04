export default class StringUtil
{
   /**
    * Compares two paths.
    *
    * @param {string}   lhs - Left-hand side.
    * @param {string}   rhs - Right-hand side.
    * @param {string}   pathSep - Path separator.
    *
    * @returns {number}
    * @private
    */
   static comparePaths(lhs, rhs, pathSep = '/')
   {
      const localeLHS = lhs.toLocaleLowerCase();
      const localeRHS = rhs.toLocaleLowerCase();

      const lsplit = lhs.split(pathSep);
      const rsplit = rhs.split(pathSep);

      if (lsplit.length < rsplit.length || (lsplit.length === rsplit.length && localeLHS < localeRHS)) { return -1; }

      if (lsplit.length > rsplit.length || (lsplit.length === rsplit.length && localeLHS > localeRHS)) { return 1; }

      return 0;
   }
}