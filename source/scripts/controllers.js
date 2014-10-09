'use strict';

/* Controllers */

var troveControllers = angular.module('troveControllers', []);

// troveControllers.controller('EmptyCtrl', ['$scope',
//   function($scope) {
//   }]);

troveControllers.controller('TitleCtrl', ['$scope', '$timeout', 'Page',
  function($scope, $timeout, Page) {
    $scope.Page = Page;
    // defaults
    $scope.parameters = {};
    $scope.parameters.titleColor = 'dark';
    $scope.parameters.coverTitle = '';
    $scope.parameters.coverSubtitle = '';
    $scope.parameters.coverImageUrl = 'http://dummyimage.com/1x1/000/';
    $scope.parameters.isProfile = false;
    $scope.parameters.isNavTransitioning = false;
    $scope.parameters.isNavOpen = false;
    // functions
    $scope.parameters.closeNav =  function() {
      $scope.parameters.isNavOpen = false;
      $timeout(function() {
        $scope.parameters.isNavTransitioning = false;
      }, 200);
    };
    // $scope.$on('$routeChangeStart', function(next, current) { 
    //   console.log('route change start')
    // });
    $scope.$on('$routeChangeSuccess', function(next, current) { 
      $scope.parameters.closeNav();
    });
  }]);

troveControllers.controller('NavCtrl', ['$scope', '$location', '$timeout', 'Category',
  function($scope, $location, $timeout, Category) {
    $scope.categories = Category.query();
    $scope.closeNav = $scope.parameters.closeNav;
    $scope.isActive = function(path) {
      if (path == $location.path()) {
        return true;
      }
      return false;
    };
  }]);

troveControllers.controller('HeaderCtrl', ['$scope',
  function($scope) {
    $scope.openNav = function() {
      $scope.parameters.isNavTransitioning = true;
      $scope.parameters.isNavOpen = true;
    };
  }]);

troveControllers.controller('CoverCtrl', ['$scope', '$location', 'Category',
  function($scope, $location, Category) {
    $scope.categories = Category.query();
    $scope.isActive = function(path) {
      if (path == $location.path()) {
        return true;
      }
      return false;
    };
    // $scope.getCoverImageUrl = function(coverImageUrl) {
    //   if (coverImageUrl) {
    //     return 'url(\'' + coverImageUrl + '\')';
    //   } else {
    //     return 'none';
    //   }
    // };
  }]);

troveControllers.controller('ItemsCtrl', ['$scope', 'Page', 'Item', 'Category',
  function($scope, Page, Item, Category) {
    $scope.items = Item.query();
    $scope.categories = Category.query();
    $scope.orderProp = '_id';
    Page.setTitle('Browse - Trove'); // TEMP
    $scope.parameters.titleColor = 'dark';
    $scope.parameters.coverTitle = 'Browse';
    $scope.parameters.coverSubtitle = 'Discover products to collect';
    $scope.parameters.coverImageUrl = '';
  }]);

troveControllers.controller('CategoryCtrl', ['$scope', '$routeParams', '$filter', 'Page', 'Item', 'Category',
  function($scope, $routeParams, $filter, Page, Item, Category) {
    $scope.category = Category.get({id: $routeParams.categoryId}, function(category) {
      $scope.category = category;
      // $scope.parameters.coverTitle = category.display_name;
      $scope.parameters.coverTitle = 'Browse';
      $scope.parameters.coverSubtitle = 'Discover products to collect';
      $scope.parameters.coverImageUrl = category.cover_image_url;
      Page.setTitle('Trove — ' + category.display_name);
      Item.query().$promise.then(function(items) {
        $scope.categoryItems = $filter('filter')(items, { category_id: category._id });
      });
    });
    $scope.parameters.titleColor = 'light';
  }]);

troveControllers.controller('ItemCtrl', ['$scope', '$routeParams', 'Page', 'Item',
  function($scope, $routeParams, Page, Item) {
    $scope.item = Item.get({id: $routeParams.itemId}, function(item) {
      $scope.item = item;
      Page.setTitle('Trove — ' + item.name);
      $scope.parameters.coverTitle = item.name;
      $scope.parameters.coverSubtitle = item.description;
    }, function(err) {
      $scope.errorId = $routeParams.itemId;
    });
    $scope.parameters.titleColor = 'dark';
    $scope.parameters.coverImageUrl = '';
  }]);

troveControllers.controller('AboutCtrl', ['$scope', 'Page',
  function($scope, Page) {
    Page.setTitle('Trove — About');
    $scope.parameters.coverTitle = 'About';
    $scope.parameters.coverSubtitle = 'Trove allows you to customize products';
    $scope.parameters.coverImageUrl = '';
    $scope.parameters.titleColor = 'dark';
  }]);
