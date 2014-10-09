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
