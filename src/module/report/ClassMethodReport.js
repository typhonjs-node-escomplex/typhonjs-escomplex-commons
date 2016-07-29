import MethodReport  from './MethodReport';

import ReportType    from '../../types/ReportType';

/**
 * Provides the method report object which stores data pertaining to a single method / function.
 */
export default class ClassMethodReport extends MethodReport
{
   /**
    * Returns the enum for the report type.
    * @returns {CLASS_METHOD}
    */
   get type() { return ReportType.CLASS_METHOD; }

   ///**
   // * Initializes class method report.
   // *
   // * @param {string}   name - Name of the method.
   // * @param {number}   lineStart - Start line of method.
   // * @param {number}   lineEnd - End line of method.
   // * @param {number}   params - Number of parameters for method.
   // */
   //constructor(name = '', lineStart = 0, lineEnd = 0, params = 0)
   //{
   //   super(name, lineStart, lineEnd, params);
   //}

   /**
    * Deserializes a JSON object representing a ClassMethodReport.
    *
    * @param {object}   object - A JSON object of a ClassMethodReport that was previously serialized.
    *
    * @returns {ClassMethodReport}
    */
   static parse(object)
   {
      return this._parse(new ClassMethodReport(), object);
   }
}
