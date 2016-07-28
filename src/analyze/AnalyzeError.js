/**
 * Provides a wrapper for analysis errors stored in the `errors` array for each report type.
 */
export default class AnalyzeError
{
   /**
    * Initializes an instance.
    *
    * @param {number}   line - Provides the line number where the error is found.
    * @param {string}   severity - Provides the severity level.
    * @param {string}   message - Provides the error message.
    * @param {string}   source - Provides a description of where the error is found.
    */
   constructor(line = 0, severity = '<unknown>', message = '', source = '')
   {
      /**
       * Provides the line number where the error is found.
       * @type {number}
       */
      this.line = line;

      /**
       * Provides the severity level.
       * @type {string}
       */
      this.severity = severity;

      /**
       * Provides the error message.
       * @type {string}
       */
      this.message = message;

      /**
       * Provides a description of where the error is found.
       * @type {string}
       */
      this.source = source;
   }

   /**
    * Returns a verbose string about the error.
    * @returns {string}
    */
   toString()
   {
      return `(${this.severity}) ${this.source} - ${this.line}: ${this.message}`;
   }
}
