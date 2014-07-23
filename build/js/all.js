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

troveApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/', {
        templateUrl: '/partials/items.html',
        controller: 'ItemsCtrl'
      }).
      when('/item/:itemId', {
        templateUrl: '/partials/item.html',
        controller: 'ItemCtrl'
      }).
      when('/category/:categoryId', {
        templateUrl: '/partials/category.html',
        controller: 'CategoryCtrl'
      }).
      when('/about', {
        templateUrl: '/partials/about.html',
        controller: 'AboutCtrl'
      }).
      when('/contact', {
        templateUrl: '/partials/contact.html',
        controller: 'ContactCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

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
    $scope.parameters.coverImageUrl = 'http://dummyimage.com/1x1/000/';
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

troveControllers.controller('NavCtrl', ['$scope', '$timeout', 'Category',
  function($scope, $timeout, Category) {
    $scope.categories = Category.query();
    $scope.closeNav = $scope.parameters.closeNav;
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

'use strict';

/* Directives */

'use strict';

/* Filters */

var troveFilters = angular.module('troveFilters', []);

// troveFilters.filter('categoryFilter', function() {
//   return function(itemsArray, category) {
//     // console.log(item)
//     return true;
//   };
// });
'use strict';

/* Services */

var troveServices = angular.module('troveServices', ['ngResource']);

var databaseUrl = 'https://api.mongolab.com/api/1/databases/elsa-sample/collections'
var apiKey = 'YcBYH6S0D8qjtOlMj9KIua5LQDmI_S8D';

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
    // var Item = $resource('/data/:id.json', {}, {
    //   query: { method: 'GET', params: {id: 'items'}, isArray: true }
    // });
    var Item = $resource(databaseUrl + '/items/:id',
      { apiKey: apiKey }, {
        // getCategoryItems: { method: 'GET', isArray: true }, 
        update: { method: 'PUT' }
      }
    );
    return Item;
  }]);

troveServices.factory('Category', ['$resource',
  function($resource) {
    var Category = $resource(databaseUrl + '/categories/:id',
      { apiKey: apiKey }, {
        update: { method: 'PUT' }
      }
    );
    return Category;
  }]);
