import StringUtil from './StringUtil';

/**
 * Provides common XML utilities.
 */
export default class XMLUtil
{
   /**
    * Creates a XML element.
    *
    * @param {number}   indentation - Current indentation amount.
    * @param {string}   tag - A tag defining opening / closing.
    * @param {boolean}  linebreak - A boolean indicating a line break.
    * @param {*}        content - Content to append.
    *
    * @returns {string}
    */
   static createElement(indentation, tag, linebreak, content)
   {
      return XMLUtil.createElementWithTags(indentation, tag, tag, linebreak, content);
   }

   /**
    * Creates a XML element w/ attributes.
    *
    * @param {number}   indentation - Current indentation amount.
    * @param {string}   tag - A tag defining opening / closing.
    * @param {string}   attributes - Attributes to append.
    * @param {boolean}  linebreak - A boolean indicating a line break.
    * @param {*}        content - Content to append.
    *
    * @returns {string}
    */
   static createElementWithAttributes(indentation, tag, attributes, linebreak, content)
   {
      return XMLUtil.createElementWithTags(indentation, `${tag} ${attributes}`, tag, linebreak, content);
   }

   /**
    * Creates an XML element with tags.
    *
    * @param {number}   indentation - Current indentation amount.
    * @param {string}   openingTag - An opening tag.
    * @param {string}   closingTag - A closing tag.
    * @param {boolean}  linebreak - A boolean indicating a line break.
    * @param {*}        content - Content to append.
    *
    * @returns {string}
    */
   static createElementWithTags(indentation, openingTag, closingTag, linebreak, content)
   {
      return `${StringUtil.indent(indentation, '<')}${openingTag}>`
       + `${linebreak ? '\n' : ''}${content}`
        + `${linebreak ? StringUtil.indent(indentation, '</') : '</'}${closingTag}>\n`;
   }

   /**
    * Creates an empty XML element with attributes.
    *
    * @param {number}   indentation - Current indentation amount.
    * @param {string}   tag - A tag.
    * @param {string}   attributes - Attributes to append.
    *
    * @returns {string}
    */
   static createEmptyElementWithAttributes(indentation, tag, attributes)
   {
      const nextIndentation = StringUtil.incrementIndent(indentation);

      return `${StringUtil.indent(indentation, '<')}${tag}\n${StringUtil.indent(nextIndentation, `${attributes}\n`)}`
       + `${StringUtil.indent(indentation, '/>')}\n`;
   }

   /**
    * Creates the XML definition.
    *
    * @returns {string}
    */
   static createXMLDefinition()
   {
      return '<?xml version="1.0" encoding="UTF-8" ?>\n';
   }
}