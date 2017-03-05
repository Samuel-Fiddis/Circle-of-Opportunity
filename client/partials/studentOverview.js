// ****************************************************************************
// Events and Helpers allocated to the studentOverview Template
// ****************************************************************************

// Template Level subscription
// ---------------------------

// Note: The onCreated function is run the moment the page is rendered
Template.studentOverview.onCreated( function() {

  // Subscribe to overall userData publication
  // *****************************************
  this.subscribe('userData');

  /*
  this.autorun(function() {
    this.subscribe('userData');
  });
  */

  // Notes: this.subscribe() attaches subscriptionReady() (whereas Meteor.subscribe() doesnt)
  // Notes: this.autorun automatically re-initializes the subscription if something changes
});

// studentView Helper to pass on the information of the users
// ----------------------------------------------------------

// below returns all the users
// Note: user: ()=> { return Meteor.users.find();} did not work
//       is equivalent to
//       user: function() { return Meteor.users.find(); }

Template.studentOverview.helpers({
  user: ()=> {
    return Meteor.users.find();
  }
});
