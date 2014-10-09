'use strict';

// Controllers

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

troveControllers.controller('NavCtrl', ['$scope', '$location', '$timeout', 'Browse',
  function($scope, $location, $timeout, Browse) {
    $scope.browseItems = Browse.query();
    $scope.closeNav = $scope.parameters.closeNav;
    $scope.isActiveNav = function(path) {
      if ($location.path().indexOf(path) >= 0) {
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

troveControllers.controller('CoverCtrl', ['$scope',
  function($scope) {
  }]);

troveControllers.controller('BrowseCtrl', ['$scope', '$location', '$routeParams', '$filter', 'Page', 'Item', 'Browse',
  function($scope, $location, $routeParams, $filter, Page, Item, Browse) {
    $scope.browseList = Browse.query();
    $scope.browse = Browse.get({id: $routeParams.browseId}, function(browse) {
      $scope.browse = browse;
      Page.setTitle('Trove — ' + browse.title);
      Item.query().$promise.then(function(items) {
        $scope.browseItems = $filter('filter')(items, { browse_id: browse._id });
      });
    });
    $scope.orderProp = '_id';
    $scope.parameters.titleColor = 'dark';
    $scope.parameters.coverTitle = 'Browse';
    $scope.parameters.coverSubtitle = 'Discover products to collect';
    $scope.parameters.coverImageUrl = '';
    $scope.isActive = function(path) {
      if (path == $location.path()) {
        return true;
      }
      return false;
    };
  }]);

troveControllers.controller('SearchCtrl', ['$scope', 'Page', 'Item',
  function($scope, Page, Item) {
    Page.setTitle('Trove — Search');
    $scope.parameters.coverTitle = 'Search';
    $scope.parameters.coverSubtitle = '';
    $scope.parameters.titleColor = 'dark';
    $scope.parameters.coverImageUrl = '';
  }]);

troveControllers.controller('ProfileCtrl', ['$scope', 'Page', 'Item',
  function($scope, Page, Item) {
    Page.setTitle('Trove — ' + 'Justin Wang'); // TO DO: data-ize this
    $scope.parameters.coverTitle = 'Justin Wang';
    $scope.parameters.coverSubtitle = 'User Interface Designer';
    $scope.parameters.titleColor = 'light';
    $scope.parameters.coverImageUrl = 'http://placehold.it/1200x500';
  }]);

troveControllers.controller('ItemCtrl', ['$scope', '$routeParams', 'Page', 'Item',
  function($scope, $routeParams, Page, Item) {
    $scope.item = Item.get({id: $routeParams.itemId}, function(item) {
      $scope.item = item;
      Page.setTitle('Trove — ' + item.title);
      $scope.parameters.coverTitle = item.title;
      $scope.parameters.coverSubtitle = item.subtitle;
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
