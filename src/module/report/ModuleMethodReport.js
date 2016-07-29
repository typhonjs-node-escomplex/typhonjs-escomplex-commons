import MethodReport  from './MethodReport';

import ReportType    from '../../types/ReportType';

/**
 * Provides the module method report object which stores data pertaining to a single method / function.
 */
export default class ModuleMethodReport extends MethodReport
{
   /**
    * Returns the enum for the report type.
    * @returns {MODULE_METHOD}
    */
   get type() { return ReportType.MODULE_METHOD; }

   ///**
   // * Initializes method report.
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
    * Deserializes a JSON object representing a ModuleMethodReport.
    *
    * @param {object}   object - A JSON object of a ModuleMethodReport that was previously serialized.
    *
    * @returns {ModuleMethodReport}
    */
   static parse(object)
   {
      return this._parse(new ModuleMethodReport(), object);
   }
}
