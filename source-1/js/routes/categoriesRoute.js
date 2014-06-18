// routes/categoriesRoute.js

App.CategoriesRoute = Ember.Route.extend({
  model: function(){
    return this.store.find('item');
  }
});