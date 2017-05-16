import './navBar.html';

Template.navBar.helpers({

  user: function() {
    return Meteor.userId();
  }
});