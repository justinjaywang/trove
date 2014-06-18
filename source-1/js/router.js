// router.js

App.Router.map(function(){
  this.resource('items', { path: '/' });
  this.resource('item', { path: '/items/:item_id' });
  this.resource('about', { path: '/about' });
  this.resource('contact', { path: '/contact' });
  this.resource('categories', { path: '/categories' }, function () {
    this.route('bathroom', { path: '/bathroom' });
    this.route('kitchen', { path: '/kitchen' });
  });

  //   this.resource('item', { path:'/:item_id' }, function(){
  //     this.route('edit');
  //   });
  //   this.route('create');
  // });
});

// handle wrong routes
App.MissingRoute = Em.Route.extend({
  redirect: function(){
    this.transitionTo('items');
  }
});