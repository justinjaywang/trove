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
    $scope.parameters = {};
    $scope.parameters.titleColor = 'dark';
    $scope.parameters.coverTitle = '';
    $scope.parameters.coverImageUrl = 'http://dummyimage.com/1x1/000/';
    $scope.parameters.isNavTransitioning = false;
    $scope.parameters.isNavOpen = false;
  }]);

troveControllers.controller('NavCtrl', ['$scope', '$timeout', 'Category',
  function($scope, $timeout, Category) {
    $scope.categories = Category.query();
    $scope.closeNav = function() {
      $scope.parameters.isNavOpen = false;
      $timeout(function() {
        $scope.parameters.isNavTransitioning = false;
      }, 200);
    };
  }]);

troveControllers.controller('HeaderCtrl', ['$scope',
  function($scope) {
    $scope.openNav = function() {
      $scope.parameters.isNavTransitioning = true;
      $scope.parameters.isNavOpen = true;
    };
  }]);

troveControllers.controller('CoverCtrl', ['$scope',
  function($scope) {
    $scope.getCoverImageUrl = function(coverImageUrl) {
      if (coverImageUrl) {
        return 'url(\'' + coverImageUrl + '\')';
      } else {
        return 'none';
      }
    };
  }]);

troveControllers.controller('ItemsCtrl', ['$scope', 'Page', 'Item', 'Category',
  function($scope, Page, Item, Category) {
    $scope.items = Item.query();
    $scope.categories = Category.query();
    $scope.orderProp = '_id';
    Page.setTitle('Trove / Featured'); // TEMP
    $scope.parameters.titleColor = 'dark';
    $scope.parameters.coverTitle = 'Featured';
    $scope.parameters.coverImageUrl = '';
  }]);

troveControllers.controller('ItemCtrl', ['$scope', '$routeParams', 'Page', 'Item',
  function($scope, $routeParams, Page, Item) {
    $scope.item = Item.get({id: $routeParams.itemId}, function(item) {
      $scope.item = item;
      Page.setTitle(item.name + ' on Trove'); // TEMP
    }, function(err) {
      $scope.errorId = $routeParams.itemId;
    });
    $scope.parameters.titleColor = 'dark';
    $scope.parameters.coverTitle = '';
    $scope.parameters.coverImageUrl = '';
  }]);

troveControllers.controller('CategoryCtrl', ['$scope', '$routeParams', '$filter', 'Page', 'Item', 'Category',
  function($scope, $routeParams, $filter, Page, Item, Category) {
    $scope.category = Category.get({id: $routeParams.categoryId}, function(category) {
      $scope.category = category;
      Page.setTitle('Trove / ' + category.display_name); // TEMP
      $scope.parameters.coverTitle = category.display_name;
      $scope.parameters.coverImageUrl = category.cover_image_url;
      Item.query().$promise.then(function(items) {
        $scope.categoryItems = $filter('filter')(items, { category_id: category._id });
      });
    });
    $scope.parameters.titleColor = 'light';
  }]);

troveControllers.controller('AboutCtrl', ['$scope', 'Page',
  function($scope, Page) {
    Page.setTitle('Trove / About'); // TEMP
    $scope.parameters.coverTitle = 'About';
    $scope.parameters.coverImageUrl = '';
    $scope.parameters.titleColor = 'dark';
  }]);

troveControllers.controller('ContactCtrl', ['$scope', 'Page',
  function($scope, Page) {
    Page.setTitle('Trove / Contact'); // TEMP
    $scope.parameters.coverTitle = 'Contact';
    $scope.parameters.coverImageUrl = '';
    $scope.parameters.titleColor = 'dark';
  }]);
