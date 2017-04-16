import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './profilepage.html';

// *****************************************************************************
// What happens when you create the template
// *****************************************************************************

// OnCreated function for the template --> is run when page is rendered
// --------------------------------------------------------------------

Template.profilepage.onCreated( function() {

  // Template level subscriptions
  // ****************************

  // Subscribe thisUser publication: returns the entire user document for the currently logged in user
  // Subscribe singleUser publication: returns just public info of single user
  var self = this;

  self.autorun(function() {

    var id = FlowRouter.getParam('id');
    var userid = Meteor.userId();

    // subscribe to personal profile info

    if(id == userid){
      self.subscribe('thisUser', userid);
    }

    else{
      self.subscribe('singleUser', id);
    }

    // NOTE: Not sure how to selectively subscribe to donorData or studentData depending on userType


    // Subscribe to limited donor data to get the name and all that of donors
    self.subscribe('donorData');

    // subscribe to limited student data to get the name and all that of students
    self.subscribe('studentData');



  });

});

// *****************************************************************************
// Events allocated to Profile Page
// *****************************************************************************

// Events function for the Profile Page: defines all events allocated to form
// -----------------------------------------------------------------------------

Template.profilepage.events({

  // Event to define what happens when you submit the register form
  // **************************************************************

  'click button': function(event,template) {

    // get the id of the student with this profile page
    var studentId = FlowRouter.getParam('id');



    // call the updateInterest method passing on the studentId
    // =======================================================

    /*
    NOTE: You should avoid passing userId's to meteor methods (because then anyone can update that field)
    so this needs to be improved
    */

    Meteor.call('updateInterest', studentId, function(error, result) {

      // What happens if methods function returns an error
      // +++++++++++++++++++++++++++++++++++++++++++++++++

      if(error) {

        // display the error on the console log of the website
        console.log(error.reason);

        // Set the lastError variable
        /*
        template.lastError.set(error.reason);
        */

      }

      // What happens if methods function works fine
      // ++++++++++++++++++++++++++++++++++++++++++++

      else {

        // Set the lastError to null
        /*
        template.lastError.set(null);
        */

        // redirect the user to another page
        FlowRouter.go('/')
      };

    });

  }

});


// *****************************************************************************
// Template level Helpers
// *****************************************************************************

// Helpers function for the template --> defines all the helpers needed
// ---------------------------------------------------------------------

Template.profilepage.helpers({

  // userData is the selected User's document
  // **************************************

  userProfile: ()=> {
    var id = FlowRouter.getParam('id');
    return Meteor.users.findOne({_id: id});
  },

  // test to see if this profile is their profilepage
  ownProfile: ()=> {
    var id = FlowRouter.getParam('id');
    return Meteor.userId() == id;
  },

  // balance is the balance on the current user's ethereum account
  // *************************************************************

  // need to check that the "this" here still works the same way as in studentView
  // nope it doesnt -- need to fix this
  balance: function() {
    var myEthAddr = this.ethereum;
    return ethGetBalance(myEthAddr);
  },

  // checking if user is a student
  // *****************************

  student: function () {

    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    var userType = user.userType;

    if( userType == "student" ) {
      return true;
    }

    return false;
  },

  // getting the donor's information on a student profile
  // ****************************************************

  donorInfo: function(index) {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    var donorId = user.interestedDonors[index];
    return Meteor.users.findOne({_id: donorId});
  },

  // getting the student's information on a donor profile
  // ****************************************************
  
  studentInfo: function(index) {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    var studentId = user.interestStudent[index];
    return Meteor.users.findOne({_id: studentId});
  }

});
