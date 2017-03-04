// ****************************************************************************
// Events and Helpers allocated to the studentView Template
// ****************************************************************************

// Template Level subscription
// ---------------------------

// The onCreated function is run the moment the page is rendered
Template.studentView.onCreated( function() {

  // Subscribe to overall userData publication
  // *****************************************
  this.subscribe('userData')

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

Template.UniversitySingle.helpers({
	thisUser: ()=> {
		return Meteor.users.findOne();
	}
});
