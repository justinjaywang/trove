'use strict';

// Directives

var troveDirectives = angular.module('troveDirectives', []);

troveDirectives.directive('focus', ['$timeout', 
  function($timeout) {
    return function(scope, element, attrs) {
      scope.$watch(attrs.focus, function(val) {
        if (val) {
          $timeout(function() { 
            element[0].focus();
          }, 250);
        }
      }, true);
    }
  }]);
