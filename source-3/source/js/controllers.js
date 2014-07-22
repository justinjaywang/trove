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
    $scope.textColor = 'test';
    $scope.parameters = {};
    $scope.parameters.titleColor = 'dark';
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
    $scope.getCoverImageUrl = function(coverImageUrl) {
      if (coverImageUrl) {
        return 'url(\'' + coverImageUrl + '\')';
      } else {
        return 'none';
      }
    };
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
    $scope.coverImageUrl = '';
    $scope.parameters.titleColor = 'dark';

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

  }]);

troveControllers.controller('CategoryCtrl', ['$scope', '$routeParams', '$filter', 'Page', 'Item', 'Category',
  function($scope, $routeParams, $filter, Page, Item, Category) {
    $scope.category = Category.get({id: $routeParams.categoryId}, function(category) {
      $scope.category = category;
      Page.setTitle('Trove / ' + category.display_name); // TEMP
      $scope.coverTitle = category.display_name;
      $scope.coverImageUrl = category.cover_image_url;
      Item.query().$promise.then(function(items) {
        $scope.categoryItems = $filter('filter')(items, { category_id: category._id });
      });
    });
    $scope.parameters.titleColor = 'light';

  }]);

troveControllers.controller('AboutCtrl', ['$scope', 'Page',
  function($scope, Page) {
    Page.setTitle('Trove / About'); // TEMP
    $scope.coverTitle = 'About';
    $scope.coverImageUrl = '';
    $scope.parameters.titleColor = 'dark';
    
  }]);