import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './studentRegForm.html';
import '../components/uploadForm.js'

// *****************************************************************************
// What happens when you create the template
// *****************************************************************************

// OnCreated function for the template
// -----------------------------------

Template.studentRegForm.onCreated(function() {

  // Declare a global variable called lastError
  this.lastError = new ReactiveVar(null);


});

// *****************************************************************************
// Events allocated to Register Page
// *****************************************************************************

// Events function for the Registration Form: defines all events allocated to form
// --------------------------------------------------------------------------------

Template.studentRegForm.events({

  // Event to define what happens when you submit the register form
  // **************************************************************

  'submit form': function(event, template) {

    // prevent the default functionality of the form
    // =============================================

    event.preventDefault();

    // Store all the values of the user fields in a variable called options to pass on to the onCreateUser Server function
    // ===================================================================================================================


    var options = {

      email: $('input[name=email]').val(),
      password: $('input[name=password]').val(),
      password_verification: $('input[name=password_verification]').val(),

      // Contact info
      phone: $('input[name=phoneNumber]').val(),

      // personal information
      age: $('input[name=age]').val(),
      image: $('input[name=image]').val(),

      // external Ethereum Account
      ethereum_ext: $('input[name=ethereum_ext]').val(),
    }

    // Add in all embedded document information to options
    // ===================================================

    // userType embedded document
    options.userType = {
      isStudent: true,
      isDonor: false,
      isUniAdmin: false
    }

    // Name embedded document
    options.name = {
      first: $('input[name=firstName]').val(),
      middle: $('input[name=middleName]').val(),
      last: $('input[name=lastName]').val()
    }

    // Address embedded document
    options.address = {
      country: $('input[name=country]').val(),
      city: $('input[name=city]').val(),
      street: $('input[name=street]').val(),
      zipCode: $('input[name=zipCode]').val()
    }

    // Create an ethereum account & store public key address
    // =====================================================
    var myAddr = ethCreateAccount();
    options.ethereum = myAddr;


    options.allowance = document.getElementById("allowance").checked;
    options.pledge = document.getElementById("pledge").checked;
    // Call signup Method passing options as an argument
    // =================================================

    Meteor.call('signup', options, function(error, result) {

      // What happens if methods function returns an error
      // +++++++++++++++++++++++++++++++++++++++++++++++++

      if(error) {

        // display the error on the console log of the website
        console.log(error.reason);

        // Set the lastError variable
        template.lastError.set(error.reason);

      }

      // What happens if methods function works fine
      // ++++++++++++++++++++++++++++++++++++++++++++

      else {

        // Set the lastError to null
        template.lastError.set(null);

        // automatic login for the user
        Meteor.loginWithPassword(options.email, options.password);

        // redirect the user to another page after registration
        FlowRouter.go('/students')
      }
    });
  }
});

// *****************************************************************************
// Template level Helpers
// *****************************************************************************

// Helpers function for the Registration Form --> defines all the helpers needed
// -----------------------------------------------------------------------------

Template.studentRegForm.helpers({

  // errorMessage returns the last error message logged by template
  // **************************************************************

  errorMessage: function () {
    return Template.instance().lastError.get();
  },

});
