(function () {
    "use strict";

    angular
        .module("starter.directives")
        .directive("customInput",
            customInput
        );

    //sample usage: <custom-input required="required" ng-minlength=3 ng-model="somevariable" form-name="someformname" field-name="somefieldname" type="text">Some Label Text:</custom-input>

    function customInput() {
        return {
            require: ['ngModel', 'fieldName', 'formName'],
            restrict: 'E',
            templateUrl: '/app/common.directives/customInputDirective.html',
            scope: {
                ngModel: '=',
                fieldname: '@fieldname',
                formname: '@formname'
            },
            replace: true,
            transclude: true,
            priority: 10,
            compile: function (tElement, tAttrs, transclude) {
                var tInput = tElement.find('input');

                // Move the attributed given to 'custom-input'
                // to the real input field
                angular.forEach(tAttrs, function (value, key) {
                    if (key.charAt(0) == '$')
                        return;
                    tInput.attr(key, value);
                    tInput.parent().removeAttr(key);
                });
                tElement.removeAttr('ng-model');

                return;
            },
        };
        

    }
}());