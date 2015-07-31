/**!
 * @ngdoc directive
 * @name ngPlaceholder.directive:ngPlaceholder
 * @restrict E
 *
 * @description
 * HTML5 placeholder polyfill to ensure all browsers will support helpful
 * text examples for inputs. Placeholder values will not be server submit.
 *
 * @param {string=} ngPlaceholder Text to use as placeholder value when no
 *     user content has been entered. Generally example usage of field.
 */

// Check for HTML5 placeholder support.
// Thanks to Modernizr for exmaple (http://modernizr.com/)
var PLACEHOLDER_SUPPORT = (function () {
    var input_element = document.createElement('input');
    return 'placeholder' in input_element;
}());

angular.module('ngPlaceholder', [])
    .directive('placeholder', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var _placeholder = attr.ngPlaceholder || attr.placeholder;
                var _form = element[0].form;
                // If browser has HTML5 placeholder ensure it is set and leave
                if (PLACEHOLDER_SUPPORT) {
                    return;
                }
                // Without HTML5 placeholder support set the value of the
                // input by default and blur, and unset on focus.
                // Wait for ngModel to get set to the value if required
                $timeout(function () {
                    if (!element.val()) {
                        element.val(_placeholder);
                        element.addClass('placeholder');
                    }
                }, 250);
                element.bind('focus', function (e) {
                    if (element.val() === _placeholder) {
                        element.val('');
                        element.removeClass('placeholder');
                    }
                });
                element.bind('blur', function (e) {
                    if (element.val() === '') {
                        element.addClass('placeholder');
                        element.val(_placeholder);
                    }
                });
                // If this element is part of a form ensure that the placeholder
                // value is not sent to the server on submit
                if (_form !== null) {
                    angular.element(_form).bind('submit', function (e) {
                        if (element.val() === _placeholder) {
                            element.val('');
                        }
                        return true;
                    });
                }
            }
        };
    }]);
