import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './updateForm.html';

// *****************************************************************************
// What happens when you create the template
// *****************************************************************************

// OnCreated function for the template --> is run when page is rendered
// --------------------------------------------------------------------

Template.updateForm.onCreated( function() {

  // Template level subscriptions
  // ****************************

  // Subscribe thisUser publication: returns the entire user document for the currently logged in user
  var userId = Meteor.userId();
  this.subscribe('thisUser', userId);

});


// *****************************************************************************
// Events allocated to updateForm Page
// *****************************************************************************

// Events function for the updateForm: defines all events allocated to form
// --------------------------------------------------------------------------------

Template.updateForm.events({

  // Create the submit form function
  // *******************************

  'submit form': function(event, template) {

    // prevents the default functionality of the form
    // ==============================================

    event.preventDefault();

    // Declare and define the variables the user wants to update for each field
    // ========================================================================

    var options = {

      // Contact info
      phone: $('input[name=phoneNumber]').val(),

      // Personal Information
      age: $('input[name=age]').val(),

      // Personal Story
      bio: $('textarea[name=bio]').val(),

      // external Ethereum Account
      ethereum_ext: $('input[name=ethereum_ext]').val(),
    }

    // Name Information
    options.name = {
      first: $('input[name=firstName]').val(),
      middle: $('input[name=middleName]').val(),
      last: $('input[name=lastName]').val()
    }

    // Address Information
    options.address = {
      country: $('input[name=country]').val(),
      city: $('input[name=city]').val(),
      street: $('input[name=street]').val(),
      zipCode: $('input[name=zipCode]').val()
    }



    // Call the "updateUser" Method
    // ============================


    Meteor.call('updateUser', options, function(error, result) {

      // What happens if methods function returns an error
      // +++++++++++++++++++++++++++++++++++++++++++++++++

      if(error) {

        // display the error on the console log of the website
        console.log(error.reason);

        /*
        NOTE: Add extra error handling here
        1. Set the lastError variable
        2. template.lastError.set(error.reason);
        */

      }

      // What happens if methods function works fine
      // +++++++++++++++++++++++++++++++++++++++++++

      else {

        /*
        NOTE: Add extra error handling here
        1. Set the lastError to null
        2. template.lastError.set(null);
        */
        var userid = Meteor.userId();
        // redirect the user to their profile page after update
        FlowRouter.go('profilepage', {id: userid});
      }

    });


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

Template.updateForm.helpers({

  // userData is the currentUser's document
  // **************************************

  userData: function() {
    return Meteor.user();
  },

  // checking if profile belongs to a student
  // ****************************************
  student: function () {
    var id = this._id;
    console.log("student function");
    console.log(id);
    var user = Meteor.users.findOne({_id: id});
    return user.userType.isStudent;
  },

});
