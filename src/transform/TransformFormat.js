import ModuleReport        from '../module/report/ModuleReport';
import ProjectResult       from '../project/result/ProjectResult';

import FormatJSON          from './formats/FormatJSON';
import FormatJSONExpanded  from './formats/FormatJSONExpanded';
import FormatMarkdown      from './formats/FormatMarkdown';
import FormatText          from './formats/FormatText';
import FormatTextMinimal   from './formats/FormatTextMinimal';
import FormatTextModules   from './formats/FormatTextModules';
import FormatXML           from './formats/FormatXML';
import FormatXMLCheckstyle from './formats/FormatXMLCheckstyle';

/**
 * Stores all transform formats.
 * @type {Map<string>, object}
 * @ignore
 */
const s_FORMATTERS = new Map();

export default class TransformFormat
{
   /**
    * Adds a formatter to the static Map by type: `format.type`.
    *
    * @param {object}   format - An instance of an object conforming to the module / project transform format API.
    */
   static addFormat(format)
   {
      if (typeof format !== 'object') { throw new TypeError(`addFormat error: 'format' is not an 'object'.`); }

      if (typeof format.extension !== 'string')
      {
         throw new TypeError(`addFormat error: 'format.extension' is not a 'string'.`);
      }

      if (typeof format.type !== 'string')
      {
         throw new TypeError(`addFormat error: 'format.type' is not a 'string'.`);
      }

      if (typeof format.formatReport !== 'function')
      {
         throw new TypeError(`addFormat error: 'format.formatReport' is not a 'function'.`);
      }

      if (typeof format.formatResult !== 'function')
      {
         throw new TypeError(`addFormat error: 'format.formatResult' is not a 'function'.`);
      }

      s_FORMATTERS.set(format.type, format);
   }

   static forEach(callback, thisArg)
   {
      s_FORMATTERS.forEach(callback, thisArg);
   }

   /**
    * Formats a given ModuleReport or ProjectResult via the formatter of the requested type.
    *
    * @param {ModuleReport|ProjectResult} resultOrReport - A ModuleReport or ProjectResult to format.
    * @param {string}                     type - The type of formatter to return.
    *
    * @returns {string}
    */
   static format(resultOrReport, type)
   {
      if (!(resultOrReport instanceof ModuleReport || resultOrReport instanceof ProjectResult))
      {
         throw new TypeError(`format error: 'resultOrReport' is not a 'ModuleReport' or a 'ProjectResult'.`);
      }

      const formatter = s_FORMATTERS.get(type);

      if (typeof formatter === 'undefined')
      {
         throw new Error(`format error: unknown formatter type '${type}'.`);
      }

      if (resultOrReport instanceof ModuleReport)
      {
         return formatter.formatReport(resultOrReport);
      }

      if (resultOrReport instanceof ProjectResult)
      {
         return formatter.formatResult(resultOrReport);
      }
   }

   /**
    * Returns the supported format file extension types.
    *
    * @returns {string[]}
    */
   static getFileExtensions()
   {
      return Array.from(s_FORMATTERS.values()).map((format) => { return format.extension; });
   }

   /**
    * Returns the format types supported.
    *
    * @returns {string[]}
    */
   static getTypes()
   {
      return Array.from(s_FORMATTERS.keys());
   }

   /**
    * Removes a formatter from the static Map by type.
    *
    * @param {string}   type - The type of the formatter: `format.type`.
    */
   static removeFormat(type)
   {
      s_FORMATTERS.delete(type);
   }
}

/**
 * Load all integrated format transforms.
 */
TransformFormat.addFormat(new FormatJSON());
TransformFormat.addFormat(new FormatJSONExpanded());
TransformFormat.addFormat(new FormatMarkdown());
TransformFormat.addFormat(new FormatText());
TransformFormat.addFormat(new FormatTextMinimal());
TransformFormat.addFormat(new FormatTextModules());
TransformFormat.addFormat(new FormatXML());
TransformFormat.addFormat(new FormatXMLCheckstyle());
