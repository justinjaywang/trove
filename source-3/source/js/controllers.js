'use strict';

/* Controllers */

var troveControllers = angular.module('troveControllers', []);

troveControllers.controller('TitleCtrl', ['$scope', 'Page',
  function($scope, Page) {
    $scope.Page = Page;
  }]);

troveControllers.controller('ItemsCtrl', ['$scope', 'Page', 'Item',
  function($scope, Page, Item) {
    $scope.items = Item.query();
    $scope.orderProp = 'id';
    Page.setTitle('Trove / Featured');
  }]);

troveControllers.controller('ItemCtrl', ['$scope', '$routeParams', 'Page', 'Item',
  function($scope, $routeParams, Page, Item) {
    $scope.item = Item.get({id: $routeParams.itemId}, function(item) {
      $scope.item = item;
      Page.setTitle(item.name + ' on Trove');
    }, function(err) {
      $scope.errorId = $routeParams.itemId;
    });
  }]);

troveControllers.controller('AboutCtrl', ['$scope', 'Page', 'Item',
  function($scope, Page, Item) {
    Page.setTitle('Trove / About');
  }]);