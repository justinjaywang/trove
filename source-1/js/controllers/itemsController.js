// controllers/itemsController.js

App.ItemsController = Ember.ArrayController.extend({
  sortProperties: ['name'],
  sortAscending: true, // false = descending
  itemsCount: function() {
    return this.get('model.length');
  }.property('@each')
});