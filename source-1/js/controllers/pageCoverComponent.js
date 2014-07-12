// controllers/pageCoverComponent.js

App.PageCoverComponent = Ember.Component.extend({
  actions: {
    // toggleBody: function() {
    //   this.toggleProperty('isShowingBody');
    // }
    openNav: function () {
      // this.toggleProperty('isNavOpen');
      this.set('isNavOpen', true);
      console.log('isNavOpen: ' + this.isNavOpen);
      // console.log(this.isNavOpen)
    },
    otherAction: function () {
      this.set('isNavOpen', false);
      console.log('isNavOpen: ' + this.isNavOpen);
    }
  }
});