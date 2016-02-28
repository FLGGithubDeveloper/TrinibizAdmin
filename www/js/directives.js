angular.module('trinibiz.directives', []).

directive('autoListDivider', function($timeout) {
    // add as an attribute in ng-repeat in view
    //auto-list-divider auto-list-divider-value="{{business.name}}"
    var lastDivideKey = "";

    return {
        link: function(scope, element, attrs) {
            var key = attrs.autoListDividerValue;

            var defaultDivideFunction = function(k){
                return k.slice( 0, 1 ).toUpperCase();
            }

            var doDivide = function(){
                var divideFunction = scope.$apply(attrs.autoListDividerFunction) || defaultDivideFunction;
                var divideKey = divideFunction(key);

                if(divideKey != lastDivideKey) {
                    var contentTr = angular.element("<div class='item item-divider'>"+divideKey+"</div>");
                    element[0].parentNode.insertBefore(contentTr[0], element[0]);
                }

                lastDivideKey = divideKey;
            }

            $timeout(doDivide,0)
        }
    }
}).

directive('noResults', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/no-results.html'
        /*controller: function () {
        };*/
      };
        //controllerAs: 'noResultsCtrl'
}).

directive('termsContent', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/terms-content.html'
      };
}).

directive('noBusinesses', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/no-businesses.html'
        /*controller: function () {
        };*/
      };
        //controllerAs: 'noResultsCtrl'
}).

directive("compareTo", function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
});
