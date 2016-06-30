'use strict';

import AbstractReport   from './AbstractReport';
import MethodReport     from './MethodReport';

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
   }
}
