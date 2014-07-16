'use strict';

/* Controllers */

var troveControllers = angular.module('troveControllers', []);

// troveControllers.controller('EmptyCtrl', ['$scope',
//   function($scope) {
//   }]);

troveControllers.controller('TitleCtrl', ['$scope', 'Page',
  function($scope, Page) {
    $scope.Page = Page;
  }]);

troveControllers.controller('NavCtrl', ['$scope',
  function($scope) {
  }]);

troveControllers.controller('HeaderCtrl', ['$scope',
  function($scope) {
  }]);

troveControllers.controller('CoverCtrl', ['$scope',
  function($scope) {
    $scope.init = function(coverTitle, coverImageUrl) {
      // set parameters if defined, otherwise default
      $scope.coverTitle = typeof coverTitle !== 'undefined' ? coverTitle : '';
      $scope.coverImageUrl = typeof coverImageUrl !== 'undefined' ? coverImageUrl : '';
    };
  }]);

troveControllers.controller('ItemsCtrl', ['$scope', 'Page', 'Item',
  function($scope, Page, Item) {
    $scope.items = Item.query();
    $scope.orderProp = 'id';
    Page.setTitle('Trove / Featured');
    $scope.coverTitle = 'Featured Items';
    $scope.coverImageUrl = 'http://placehold.it/1280x600';
    $scope.headerStyle = 'light';
  }]);

troveControllers.controller('ItemCtrl', ['$scope', '$routeParams', 'Page', 'Item',
  function($scope, $routeParams, Page, Item) {
    $scope.item = Item.get({id: $routeParams.itemId}, function(item) {
      $scope.item = item;
      Page.setTitle(item.name + ' on Trove');
    }, function(err) {
      $scope.errorId = $routeParams.itemId;
    });
    $scope.headerStyle = 'dark';
  }]);

troveControllers.controller('AboutCtrl', ['$scope', 'Page',
  function($scope, Page) {
    Page.setTitle('Trove / About');
    $scope.coverTitle = 'About';
    $scope.headerStyle = 'dark';
  }]);