'use strict';

// App Module

var troveApp = angular.module('troveApp', [
  'ngRoute',
  'ngAnimate',
  // 'troveAnimations',
  'troveControllers',
  'troveDirectives',
  'troveFilters',
  'troveServices'
]);

troveApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        redirectTo: '/browse/recommended'
        // redirectTo: '/@justinjaywang' // TEMP
        // redirectTo: '/search'
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

'use strict';

// Controllers

var troveControllers = angular.module('troveControllers', []);

// troveControllers.controller('EmptyCtrl', ['$scope',
//   function($scope) {
//   }]);

troveControllers.controller('TitleCtrl', ['$scope', '$location', '$timeout', 'Page',
  function($scope, $location, $timeout, Page) {
    $scope.Page = Page;
    $scope.parameters = {};
    // defaults
    $scope.parameters.resetParameters = function() {
      $scope.parameters.isLight = false;
      $scope.parameters.coverTitle = '';
      $scope.parameters.coverSubtitle = '';
      $scope.parameters.coverImageUrl = '';
      $scope.parameters.coverAvatarUrl = '';
      $scope.parameters.subcoverContent = '';
    }
    $scope.parameters.isNavTransitioning = false;
    $scope.parameters.isNavOpen = false;
    $scope.parameters.resetParameters();
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
    $scope.$on('$routeChangeStart', function(event, next, current) {
      if (typeof next === 'undefined') return;
      if (typeof current === 'undefined') return;
      if (next.templateUrl == current.loadedTemplateUrl) return; // same template, no need to reset params
      $scope.parameters.resetParameters();
    });
    $scope.$on('$routeChangeSuccess', function(event, next, current) {
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
    $scope.browseCategory = Browse.get({id: $routeParams.browseId}, function(browseCategory) {
      $scope.browseCategory = browseCategory;
      Page.setTitle('Trove — ' + browseCategory.title);
      Item.query().$promise.then(function(items) {
        $scope.browseItems = $filter('filter')(items, { browse_id: browseCategory._id });
        $scope.parameters.subcoverContent = $scope.browseList;
      });
    });
    $scope.parameters.coverTitle = 'Browse';
  }]);

troveControllers.controller('SearchCtrl', ['$scope', 'Page', 'Item',
  function($scope, Page, Item) {
    Page.setTitle('Trove — Search');
    Item.query().$promise.then(function(items) {
      $scope.items = items;
      $scope.parameters.subcoverContent = 'Type above to search';
    });
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
    $scope.parameters.isLight = true;
  }]);

troveControllers.controller('ItemCtrl', ['$scope', '$routeParams', 'Page', 'Item',
  function($scope, $routeParams, Page, Item) {
    $scope.item = Item.get({id: $routeParams.itemId}, function(item) {
      $scope.item = item;
      Page.setTitle('Trove — ' + item.title);
      $scope.parameters.coverTitle = item.title;
      $scope.parameters.coverSubtitle = '';
    }, function(err) {
      $scope.errorId = $routeParams.itemId;
    });
  }]);

troveControllers.controller('AboutCtrl', ['$scope', 'Page',
  function($scope, Page) {
    Page.setTitle('Trove — About');
    $scope.parameters.coverTitle = 'About';
    $scope.parameters.coverSubtitle = 'Discover and personalize everyday goods';
  }]);

'use strict';

// Directives

var troveDirectives = angular.module('troveDirectives', []);

troveDirectives.directive('focus', ['$timeout', 
  function($timeout) {
    return function(scope, element, attrs) {
      scope.$watch(attrs.focus, function(val) {
        if (val) {
          $timeout(function() { 
            element[0].focus();
          }, 250);
        }
      }, true);
    }
  }]);

'use strict';

// Filters

var troveFilters = angular.module('troveFilters', []);

troveFilters.filter('numResultsFilter', function() {
  return function(n) {
    if (n == 0) {
      return 'No results';
    } else if (n == 1) {
      return '1 result';
    } else {
      return n + ' results';
    }
  }; 
});

'use strict';

// Services

var troveServices = angular.module('troveServices', ['ngResource']);

var databaseUrl = 'https://api.mongolab.com/api/1/databases/trove-sample/collections'
var apiKey = 'qKGOKqNKwd9W5eKWubbMfPpZEU79BGOK';

troveServices.factory('Page', [
  function() {
    var title = 'Trove';
    return {
      title: function() { return title; },
      setTitle: function(newTitle) { title = newTitle; }
    }
  }]);

troveServices.factory('Item', ['$resource',
  function($resource) {
    var Item = $resource(databaseUrl + '/items/:id',
      { apiKey: apiKey }, {
        update: { method: 'PUT' }
      }
    );
    return Item;
  }]);

troveServices.factory('Browse', ['$resource',
  function($resource) {
    var Browse = $resource(databaseUrl + '/browse/:id',
      { apiKey: apiKey }, {
        update: { method: 'PUT' }
      }
    );
    return Browse;
  }]);

troveServices.factory('User', ['$resource',
  function($resource) {
    var User = $resource(databaseUrl + '/users/:id',
      { apiKey: apiKey }, {
        update: { method: 'PUT' }
      }
    );
    return User;
  }]);
