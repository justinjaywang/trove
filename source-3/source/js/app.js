'use strict';

/* App Module */

var troveApp = angular.module('troveApp', [
  'ngRoute',
  // 'troveAnimations',
  'troveControllers',
  // 'troveDirectives',
  // 'troveFilters',
  'troveServices'
]);

troveApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/items.html',
        controller: 'ItemsCtrl'
      }).
      when('/item/:itemId', {
        templateUrl: 'partials/item.html',
        controller: 'ItemCtrl'
      }).
      when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'AboutCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
    // $locationProvider.html5Mode(true);
  }]);
