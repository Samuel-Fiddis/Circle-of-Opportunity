import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './studentDonatePage.html';

// *****************************************************************************
// What happens when you create the template
// *****************************************************************************

// OnCreated function for the template --> is run when page is rendered
// --------------------------------------------------------------------

Template.studentDonatePage.onCreated( function() {

  // Template level subscriptions
  // ****************************

  // Subscribe thisUser publication: returns the entire user document for the currently logged in user
  var userId = Meteor.userId();
  this.subscribe('thisUser', userId);

  var id = FlowRouter.getParam('id');
  this.subscribe('singleUser', id);

});


// *****************************************************************************
// Events allocated to updateForm Page
// *****************************************************************************

// Events function for the updateForm: defines all events allocated to form
// --------------------------------------------------------------------------------

Template.studentDonatePage.events({

  // Create the submit form function
  // *******************************

  'submit form': function(event, template) {

    // prevents the default functionality of the form
    // ==============================================

    event.preventDefault();

    // Define all of the variables to be used in the ethSendEtherTransaction
    // ========================================================================


    // Call the "ethSendEtherTransaction" Method and redirect to confirmation page
    // ============================

        var userid = Meteor.userId();
        // redirect the user to confirmation page
        FlowRouter.go('profilepage', {id: userid});

    /*
    NOTE: Meteor.call syntax
    function(error,result) is a callback function
    see: http://docs.meteor.com/api/methods.html#Meteor-call
    */
  }

});



// *****************************************************************************
// Template level Helpers
// *****************************************************************************

// Helpers function for the template --> defines all the helpers needed
// ---------------------------------------------------------------------

Template.studentDonatePage.helpers({

  // userData is the currentUser's document
  // **************************************

  userData: function() {
    return Meteor.user();
  },

  studentData: function() {
    var id = FlowRouter.getParam('id');
    return Meteor.users.findOne({_id: id});
  },
  /*
  NOTE: not sure why, i cant seem to access emails directly on the html page with {{emails[0].address}}
  1. check to see if i can access using 'emails.0.address'
  */

  email: function() {
    return Meteor.user().emails[0].address;
  },

});
