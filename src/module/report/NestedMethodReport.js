import MethodReport     from './MethodReport';

import ReportType       from '../../types/ReportType';
import TransformFormat  from '../../transform/TransformFormat';

/**
 * Provides the module method report object which stores data pertaining to a single method / function.
 */
export default class NestedMethodReport extends MethodReport
{
   constructor(name, paramNames, lineStart, lineEnd, nestedDepth = 0)
   {
      super(name, paramNames, lineStart, lineEnd);

      /**
       * Stores the nested depth.
       * @type {number}
       */
      this.nestedDepth = nestedDepth;
   }

   /**
    * Returns the enum for the report type.
    * @returns {ReportType}
    */
   get type() { return ReportType.NESTED_METHOD; }

   /**
    * Returns the supported transform formats.
    *
    * @returns {Object[]}
    */
   static getFormats()
   {
      return TransformFormat.getFormats(ReportType.NESTED_METHOD);
   }

   /**
    * Deserializes a JSON object representing a ModuleMethodReport.
    *
    * @param {object}   object - A JSON object of a ModuleMethodReport that was previously serialized.
    *
    * @returns {ModuleMethodReport}
    */
   static parse(object) { return this._parse(new NestedMethodReport(), object); }
}
