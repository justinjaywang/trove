'use strict';

/* Controllers */

var troveControllers = angular.module('troveControllers', []);

// troveControllers.controller('EmptyCtrl', ['$scope',
//   function($scope) {
//   }]);

troveControllers.controller('TitleCtrl', ['$scope', 'Page',
  function($scope, Page) {
    $scope.Page = Page;
    // defaults
    $scope.coverTitle = ''
    $scope.coverImageUrl = 'http://dummyimage.com/1x1/000/';
  }]);

troveControllers.controller('NavCtrl', ['$scope', 'Category',
  function($scope, Category) {
    $scope.categories = Category.query();
  }]);

troveControllers.controller('HeaderCtrl', ['$scope',
  function($scope) {
  }]);

troveControllers.controller('CoverCtrl', ['$scope',
  function($scope) {
    // $scope.coverTitle;
    // $scope.init = function(coverTitle, coverImageUrl) {
    //   // set parameters if defined, otherwise default
    //   $scope.coverTitle = typeof coverTitle !== 'undefined' ? coverTitle : '';
    //   $scope.coverImageUrl = typeof coverImageUrl !== 'undefined' ? coverImageUrl : '';
    // };
  }]);

troveControllers.controller('ItemsCtrl', ['$scope', 'Page', 'Item', 'Category',
  function($scope, Page, Item, Category) {
    $scope.items = Item.query();
    $scope.categories = Category.query();
    $scope.orderProp = '_id';
    Page.setTitle('Trove / Featured'); // TEMP
    $scope.coverTitle = 'Featured Items';
    $scope.coverImageUrl = 'http://placehold.it/1280x600';
    $scope.headerStyle = 'light';
  }]);

troveControllers.controller('ItemCtrl', ['$scope', '$routeParams', 'Page', 'Item',
  function($scope, $routeParams, Page, Item) {
    $scope.item = Item.get({id: $routeParams.itemId}, function(item) {
      $scope.item = item;
      Page.setTitle(item.name + ' on Trove'); // TEMP
    }, function(err) {
      $scope.errorId = $routeParams.itemId;
    });
    $scope.headerStyle = 'dark';
  }]);

troveControllers.controller('CategoryCtrl', ['$scope', '$routeParams', 'Page', 'Item', 'Category',
  function($scope, $routeParams, Page, Item, Category) {
    $scope.category = Category.get({id: $routeParams.categoryId}, function(category) {
      $scope.category = category;
      Page.setTitle('Trove / ' + category._id); // TEMP
      $scope.coverTitle = category._id;
      $scope.coverImageUrl = category.cover_image_url;
    });
    $scope.headerStyle = 'light';
    // $scope.coverTitle = 'Test';
    // $scope.coverImageUrl = 'TestUrl';
  }]);

troveControllers.controller('AboutCtrl', ['$scope', 'Page',
  function($scope, Page) {
    Page.setTitle('Trove / About'); // TEMP
    $scope.coverTitle = 'About';
    $scope.headerStyle = 'dark';
  }]);