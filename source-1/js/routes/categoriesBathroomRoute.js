// routes/categoriesBathroomRoute.js

App.CategoriesBathroomRoute = Ember.Route.extend({
  model: function(){
    return this.store.filter('item', function(item) {
      return item.get('category') == 'bathroom';
    });
  },
  renderTemplate: function() {
    this.render('category');
  }
});