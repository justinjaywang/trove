// router.js

App.Router.map(function(){
  this.resource('items', { path: '/'}, function(){
    // child routes
    this.route('item', { path: '/:item_id' })
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