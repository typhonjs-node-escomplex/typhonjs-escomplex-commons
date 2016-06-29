'use strict';

import AbstractReport   from './AbstractReport.js';
import MethodReport     from './MethodReport.js';

/**
 * Provides a class report.
 */
export default class ClassReport extends AbstractReport
{
   /**
    * Initializes class report.
    *
    * @param {string}   name - Name of the class.
    * @param {number}   lineStart - Start line of class.
    * @param {number}   lineEnd - End line of class.
    */
   constructor(name = '', lineStart = 0, lineEnd = 0)
   {
      super(new MethodReport('', lineStart, lineEnd, 0));

      /**
       * Stores the aggregate method data.
       * @type {MethodReport}
       */
      this.aggregate = this._methodReport;

      /**
       * The cyclomatic complexity of the class.
       * @type {number}
       */
      this.cyclomatic = 1;

      /**
       * The cyclomatic density of the class.
       * @type {number}
       */
      this.cyclomaticDensity = 0;

      /**
       * Stores the end line for the class.
       * @type {number}
       */
      this.lineEnd = lineEnd;

      /**
       * Stores the start line for the class.
       * @type {number}
       */
      this.lineStart = lineStart;

      /**
       * Stores all method data.
       * @type {Array<MethodReport>}
       */
      this.methods = [];

      /**
       * The name of the class.
       * @type {string}
       */
      this.name = name;

      /**
       * The source lines of code for the class.
       * @type {{logical: number, physical: number}}
       */
      this.sloc = { logical: 0, physical: lineEnd - lineStart + 1 };
   }
}
