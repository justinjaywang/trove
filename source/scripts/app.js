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

// troveApp.config(['$routeProvider', '$locationProvider',
//   function($routeProvider, $locationProvider) {
//     $locationProvider.html5Mode(true);
//     $routeProvider.
//       // when('/', {
//       //   templateUrl: '/views/items.html',
//       //   controller: 'ItemsCtrl'
//       // }).
//       when('/', {
//         redirectTo: '/category/bathroom'
//       }).
//       when('/item/:itemId', {
//         templateUrl: '/views/item.html',
//         controller: 'ItemCtrl'
//       }).
//       when('/category/:categoryId', {
//         templateUrl: '/views/category.html',
//         controller: 'CategoryCtrl'
//       }).
//       when('/about', {
//         templateUrl: '/views/about.html',
//         controller: 'AboutCtrl'
//       }).
//       when('/contact', {
//         templateUrl: '/views/contact.html',
//         controller: 'ContactCtrl'
//       }).
//       otherwise({
//         redirectTo: '/'
//       });
//   }]);

troveApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/', {
        redirectTo: '/browse/recommended'
      }).
      when('/item/:itemId', {
        templateUrl: '/views/item.html',
        controller: 'ItemCtrl'
      }).
      // when('/category/:categoryId', {
      //   templateUrl: '/views/category.html',
      //   controller: 'CategoryCtrl'
      // }).
      when('/browse/:browseId', {
        templateUrl: '/views/browse.html',
        controller: 'BrowseCtrl'
      }).
      when('/about', {
        templateUrl: '/views/about.html',
        controller: 'AboutCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
