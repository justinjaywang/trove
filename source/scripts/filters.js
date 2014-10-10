'use strict';

// Filters

var troveFilters = angular.module('troveFilters', []);

troveFilters.filter('numResultsFilter', function() {
  return function(n) {
    if (n == 0) {
      return 'No results';
    } else if (n == 1) {
      return '1 result';
    } else {
      return n + ' results';
    }
  }; 
});
