'use strict';

// Controllers

var troveControllers = angular.module('troveControllers', []);

// troveControllers.controller('EmptyCtrl', ['$scope',
//   function($scope) {
//   }]);

troveControllers.controller('TitleCtrl', ['$scope', '$location', '$timeout', 'Page',
  function($scope, $location, $timeout, Page) {
    $scope.Page = Page;
    // defaults
    $scope.parameters = {};
    $scope.parameters.titleColor = 'dark';
    $scope.parameters.coverTitle = '';
    $scope.parameters.coverSubtitle = '';
    $scope.parameters.coverImageUrl = '';
    $scope.parameters.coverAvatarUrl = '';
    $scope.parameters.subcoverContent = '';
    $scope.parameters.isNavTransitioning = false;
    $scope.parameters.isNavOpen = false;
    // functions
    $scope.parameters.closeNav =  function() {
      $scope.parameters.isNavOpen = false;
      $timeout(function() {
        $scope.parameters.isNavTransitioning = false;
      }, 200);
    };
    $scope.parameters.isActive = function(path) {
      if ($location.path().indexOf(path) >= 0) {
        return true;
      } else {
        return false;
      }
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

troveControllers.controller('SubcoverCtrl', ['$scope',
  function($scope) {
  }]);

troveControllers.controller('BrowseCtrl', ['$scope', '$location', '$routeParams', '$filter', 'Page', 'Item', 'Browse',
  function($scope, $location, $routeParams, $filter, Page, Item, Browse) {
    $scope.browseList = Browse.query();
    $scope.parameters.subcoverContent = $scope.browseList;
    $scope.browseCategory = Browse.get({id: $routeParams.browseId}, function(browseCategory) {
      $scope.browseCategory = browseCategory;
      Page.setTitle('Trove — ' + browseCategory.title);
      Item.query().$promise.then(function(items) {
        $scope.browseItems = $filter('filter')(items, { browse_id: browseCategory._id });
      });
    });
    $scope.parameters.titleColor = 'dark';
    $scope.parameters.coverTitle = 'Browse';
    $scope.parameters.coverSubtitle = 'Discover products to collect';
    $scope.parameters.coverImageUrl = '';
    $scope.parameters.coverAvatarUrl = '';
  }]);

troveControllers.controller('SearchCtrl', ['$scope', 'Page', 'Item',
  function($scope, Page, Item) {
    Page.setTitle('Trove — Search');
    $scope.items = Item.query();
    $scope.parameters.coverTitle = '';
    $scope.parameters.coverSubtitle = '';
    $scope.parameters.titleColor = 'dark';
    $scope.parameters.coverImageUrl = '';
    $scope.parameters.coverAvatarUrl = '';
    $scope.parameters.subcoverContent = '';
    $scope.minEntryFn = function(items) {
      var s = $scope.searchText;
      if (typeof s === 'undefined') return false;
      if (s.title.length < 1) return false;
      return true;
    };
  }]);

troveControllers.controller('UserCtrl', ['$scope', '$routeParams', '$filter', 'Page', 'Item', 'User',
  function($scope, $routeParams, $filter, Page, Item, User) {
    $scope.user = User.get({id: $routeParams.userId}, function(user) {
      $scope.user = user;
      Page.setTitle('Trove — ' + user.name);
      $scope.parameters.coverTitle = user.name;
      $scope.parameters.coverSubtitle = user.about;
      $scope.parameters.coverImageUrl = user.cover_image_url;
      $scope.parameters.coverAvatarUrl = user.avatar_url;
      Item.query().$promise.then(function(items) {
        $scope.userItems = $filter('filter')(items, { mine: true });
        $scope.parameters.subcoverContent = $scope.userItems.length + ' items';
      });
    }, function(err) {
      $scope.errorId = $routeParams.userId;
    });
    $scope.parameters.titleColor = 'light';
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
    $scope.parameters.subcoverContent = '';
  }]);

troveControllers.controller('AboutCtrl', ['$scope', 'Page',
  function($scope, Page) {
    Page.setTitle('Trove — About');
    $scope.parameters.coverTitle = 'About';
    $scope.parameters.coverSubtitle = 'Discover and personalize everyday goods';
    $scope.parameters.coverImageUrl = '';
    $scope.parameters.titleColor = 'dark';
  }]);
