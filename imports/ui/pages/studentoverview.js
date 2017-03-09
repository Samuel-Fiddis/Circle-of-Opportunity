import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './studentoverview.html';
import './studentView.html';

// Template Level subscription
// ---------------------------

// Note: The onCreated function is run the moment the page is rendered
Template.studentoverview.onCreated( function() {

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

  // Subscribe to overall Universities publication
  // *********************************************

  // Playing around with subscriptions --> to be changed
  this.subscribe('universities');

});

// studentView Helper to pass on the information of the users
// ----------------------------------------------------------

// below returns all the users
// Note: user: ()=> { return Meteor.users.find();}
//       is equivalent to
//       user: function() { return Meteor.users.find(); }

Template.studentoverview.helpers({
  user: ()=> {
    return Meteor.users.find();
  }
});
