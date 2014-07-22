'use strict';

/* App Module */

var troveApp = angular.module('troveApp', [
  'ngRoute',
  // 'troveAnimations',
  'troveControllers',
  // 'troveDirectives',
  'troveFilters',
  'troveServices'
]);

troveApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/', {
        templateUrl: '/partials/items.html',
        controller: 'ItemsCtrl'
      }).
      when('/item/:itemId', {
        templateUrl: '/partials/item.html',
        controller: 'ItemCtrl'
      }).
      when('/category/:categoryId', {
        templateUrl: '/partials/category.html',
        controller: 'CategoryCtrl'
      }).
      when('/about', {
        templateUrl: '/partials/about.html',
        controller: 'AboutCtrl'
      }).
      when('/contact', {
        templateUrl: '/partials/contact.html',
        controller: 'ContactCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
