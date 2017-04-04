import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './donorregform.html';

// *****************************************************************************
// What happens when you create the template
// *****************************************************************************

// OnCreated function for the template
// -----------------------------------

Template.donorregform.onCreated(function() {

  // Declare a global variable called lastError
  this.lastError = new ReactiveVar(null);

});



// *****************************************************************************
// Events allocated to Register Page
// *****************************************************************************

// Events function for the Registration Form: defines all events allocated to form
// --------------------------------------------------------------------------------

Template.donorregform.events({

  // Create the submit form function
  // *******************************

  'submit form': function(event, template) {  // not sure what the template is....

    // prevents the default functionality of the form
    // ==============================================

    event.preventDefault();


    // Store all the values of the user fields in a variable called options to pass on to the onCreateUser Server function
    // ===================================================================================================================

    var options = {

      // user info
      userType: "donor",
      email: $('input[name=email]').val(),
      password: $('input[name=password]').val(),
      password_verification: $('input[name=password_verification]').val(),

      // Contact info
      phone: $('input[name=phoneNumber]').val(),

      // personal information
      age: $('input[name=age]').val(),
      image: $('input[name=image]').val()

    }

    /*
    NOTE: $('input[name=email]') grabs the value in the html file at input[name=email]
     -> .val turns it into a js value
     -> all of it gets stored into the field name email
     */

    // add in all embedded document information to options
    // ===================================================

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

    // University info embedded document
    options.company_info = {
      uni: $('input[name=company]').val(),
      program: $('input[name=position]').val(),
    }

    // Create an ethereum account & store public key address
    // =====================================================
    /*
    var myAddr = ethCreateAccount();
    options.ethereum = myAddr;
    */

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
        FlowRouter.go('/howitworks')
      }

    });

    /* Note:
    function(error,result) is a callback function
    see: http://docs.meteor.com/api/methods.html#Meteor-call
    */
  }
});

// *****************************************************************************
// Template level Helpers
// *****************************************************************************

// Helpers function for the Registration Form --> defines all the helpers needed
// -----------------------------------------------------------------------------

Template.donorregform.helpers({

  // errorMessage returns the last error message logged by template
  // **************************************************************

  errorMessage: function () {
    return Template.instance().lastError.get();
  }
});
