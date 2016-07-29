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

   /**
    * Deserializes a JSON object representing a ModuleMethodReport.
    *
    * @param {object}   object - A JSON object of a ModuleMethodReport that was previously serialized.
    *
    * @returns {ModuleMethodReport}
    */
   static parse(object) { return this._parse(new ModuleMethodReport(), object); }
}
