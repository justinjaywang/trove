// routes/categoriesIndexRoute.js

App.CategoriesIndexRoute = Ember.Route.extend({
  // model: function(){
  //   return this.store.find('item');
  // }
  beforeModel: function() {
    this.transitionTo('items');
  }
});