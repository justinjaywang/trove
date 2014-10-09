'use strict';

// App Module

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
    $routeProvider
      .when('/', {
        // redirectTo: '/browse/recommended'
        // redirectTo: '/@justinjaywang' // TEMP
        redirectTo: '/search'
      })
      .when('/browse/:browseId', {
        templateUrl: '/views/browse.html',
        controller: 'BrowseCtrl'
      })
      .when('/search', {
        templateUrl: '/views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/@', {
        redirectTo: '/@justinjaywang'
      })
      .when('/@:userId', {
        templateUrl: '/views/user.html',
        controller: 'UserCtrl'
      })
      .when('/item/:itemId', {
        templateUrl: '/views/item.html',
        controller: 'ItemCtrl'
      })
      .when('/about', {
        templateUrl: '/views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
