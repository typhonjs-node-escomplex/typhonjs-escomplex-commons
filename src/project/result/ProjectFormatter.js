import formatJSON          from './formats/formatJSON';
import formatJSONExpanded  from './formats/formatJSONExpanded';
import formatMarkdown      from './formats/formatMarkdown';
import formatTextModules   from './formats/formatTextModules';
import formatText          from './formats/formatText';
import formatTextMinimal   from './formats/formatTextMinimal';
import formatXML           from './formats/formatXML';
import formatXMLCheckstyle from './formats/formatXMLCheckstyle';

/**
 * Provides a dispatch class with static methods to format a Proper
 */
export default class ProjectFormatter
{
   /**
    * Returns the format types supported.
    *
    * @returns {string[]}
    */
   static getTypes()
   {
      return ['json', 'json-expanded', 'markdown', 'text', 'text-minimal', 'text-modules', 'xml', 'xml-checkstyle'];
   }

   /**
    * Formats a given ProjectResult via the formatter of the requested type.
    *
    * @param {ProjectResult}  result - The type of formatter to return.
    * @param {string}         type - The type of formatter to return.
    *
    * @returns {string}
    */
   static format(result, type)
   {
      if (typeof result !== 'object') { throw new TypeError(`format error: result is not an 'object'.`); }
      if (typeof type !== 'string') { throw new TypeError(`format error: type is not a 'string'.`); }

      switch (type)
      {
         case 'json':
            return formatJSON(result);

         case 'json-expanded':
            return formatJSONExpanded(result);

         case 'markdown':
            return formatMarkdown(result);

         case 'text':
            return formatText(result);

         case 'text-minimal':
            return formatTextMinimal(result);

         case 'text-modules':
            return formatTextModules(result);

         case 'xml':
            return formatXML(result);

         case 'xml-checkstyle':
            return formatXMLCheckstyle(result);

         default:
            throw new Error(`format error: unknown type - '${type}'`);
      }
   }
}
