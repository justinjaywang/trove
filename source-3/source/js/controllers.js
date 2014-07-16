'use strict';

/* Controllers */

var troveControllers = angular.module('troveControllers', []);

troveControllers.controller('ItemsCtrl', ['$scope', 'Item',
  function($scope, Item) {
    $scope.items = Item.query();
    $scope.orderProp = 'id';
  }]);

troveControllers.controller('ItemCtrl', ['$scope', '$routeParams', 'Item',
  function($scope, $routeParams, Item) {
    $scope.item = Item.get({id: $routeParams.itemId}, function(item) {
      $scope.item = item;
    }, function(err) {
      $scope.errorId = $routeParams.itemId;
    });
    // console.log(Item.get())
  }]);

troveControllers.controller('AboutCtrl', ['$scope', 'Item',
  function($scope, Item) {
    
  }]);