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
