'use strict';

import AbstractReport   from './AbstractReport.js';
import MethodReport     from './MethodReport.js';

/**
 * Provides a class report.
 */
export default class ClassReport extends AbstractReport
{
   /**
    * Initializes function report.
    *
    * @param {string}   name - Name of the function.
    * @param {number}   lineStart - Start line of function.
    * @param {number}   lineEnd - End line of function.
    */
   constructor(name = '', lineStart = 0, lineEnd = 0)
   {
      super(new MethodReport('', lineStart, lineEnd, 0));

      /**
       * Stores the aggregate method data.
       * @type {{}}
       */
      this.aggregate = this._methodReport;

      /**
       * The name of the function.
       * @type {string}
       */
      this.name = name;

      /**
       * Stores the start line for the function.
       * @type {Object}
       */
      this.lineStart = lineStart;

      /**
       * Stores the end line for the function.
       * @type {Object}
       */
      this.lineEnd = lineEnd;

      /**
       * Stores all method data.
       * @type {Array}
       */
      this.methods = [];

      /**
       * The source lines of code for the function.
       * @type {{logical: number, physical: number}}
       */
      this.sloc = { logical: 0, physical: lineEnd - lineStart + 1 };

      /**
       * The cyclomatic complexity of the class.
       * @type {number}
       */
      this.cyclomatic = 1;
   }
}
