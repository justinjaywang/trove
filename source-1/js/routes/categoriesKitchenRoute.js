// routes/categoriesKitchenRoute.js

App.CategoriesKitchenRoute = Ember.Route.extend({
  model: function(){
    return this.store.filter('item', function(item) {
      return item.get('category') == 'kitchen';
    });
  },
  renderTemplate: function() {
    this.render('category');
  }
});