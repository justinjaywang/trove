// routes/itemRoute.js

App.ItemRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('item', params.item_id);
  },
  // renderTemplate: function() {
  //   this.render('item', { into: 'application' });
  // }
});