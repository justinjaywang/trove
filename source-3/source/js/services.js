'use strict';

/* Services */

var troveServices = angular.module('troveServices', ['ngResource']);

troveServices.factory('Item', ['$resource',
  function($resource){
    var Item = $resource('/data/:id.json', {}, {
      query: { method: 'GET', params: {id: 'items'}, isArray: true }
    });
    // var Song = $resource('https://api.mongolab.com/api/1/databases' +
    //   '/lyrics/collections/lyrics/:id',
    //   { apiKey: 'JVmmdZYza2puepYKIJWfgvgYAzP8nAZm' }, {
    //     update: { method: 'PUT' }
    //   }
    // );
    // return Song;
    return Item;
  }]);
