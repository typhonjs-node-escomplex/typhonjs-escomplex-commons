'use strict';

/**
 * Provides the base implementation for all syntax loader plugins which automatically associates member methods
 */

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractSyntaxLoader = function () {
   function AbstractSyntaxLoader() {
      _classCallCheck(this, AbstractSyntaxLoader);
   }

   _createClass(AbstractSyntaxLoader, [{
      key: 'onLoadSyntax',

      /**
       * Loads all member methods including from child classes that are not `constructor` or `onLoadSyntax`.
       *
       * @param {object}   ev - escomplex plugin event data.
       */
      value: function onLoadSyntax(ev) {
         var syntaxes = {};

         // for (const name of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))
         var _iteratorNormalCompletion = true;
         var _didIteratorError = false;
         var _iteratorError = undefined;

         try {
            for (var _iterator = s_GET_ALL_PROPERTY_NAMES(Object.getPrototypeOf(this))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
               var name = _step.value;

               // Skip constructor & onLoadSyntax methods.
               if (!(this[name] instanceof Function) || name === 'constructor' || name === 'onLoadSyntax') {
                  continue;
               }

               syntaxes[name] = this[name](ev.data.settings);
            }
         } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
         } finally {
            try {
               if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
               }
            } finally {
               if (_didIteratorError) {
                  throw _iteratorError;
               }
            }
         }

         ev.data.syntaxes = syntaxes;
      }
   }]);

   return AbstractSyntaxLoader;
}();

exports.default = AbstractSyntaxLoader;


var s_GET_ALL_PROPERTY_NAMES = function s_GET_ALL_PROPERTY_NAMES(obj) {
   var props = [];

   do {
      Object.getOwnPropertyNames(obj).forEach(function (prop) {
         if (props.indexOf(prop) === -1) {
            props.push(prop);
         }
      });
      obj = Object.getPrototypeOf(obj);
   } while (typeof obj !== 'undefined' || obj !== null);

   return props;
};
module.exports = exports['default'];