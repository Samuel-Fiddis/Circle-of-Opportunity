import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './studentoverview.html';
import './studentView.html';


console.log('bwahhhahaha');

//console.log(Universities.findOne());

// Template Level subscription
// ---------------------------

// Note: The onCreated function is run the moment the page is rendered
Template.studentoverview.onCreated( function() {

  var self = this;
  self.autorun ( function() {

    // Subscribe to overall userData publication
    // *****************************************
    console.log("hi");
    self.subscribe('userData', function() {
      //console.log(Meteor.users.findOne({}));
    });

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
    console.log("playing");

    Meteor.subscribe('universities', function() {
      console.log("i need hot chocolate");
      //console.log(Universities.findOne({}));
    });

    // console.log("bye");
  });

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
/*
Template.studentoverview.helpers({
  universities: () => {
    return Meteor.universities.find();
  }
});
*/
