import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './studentRegForm.html';

// *****************************************
// What happens when you create the template
// *****************************************

// OnCreated function for the template
// -----------------------------------

Template.studentRegForm.onCreated(function() {

  // Declare a global variable called lastError
  this.lastError = new ReactiveVar(null);

});



// *********************************
// Events allocated to Register Page
// *********************************

// Event to define what happens when you submit the register form
// --------------------------------------------------------------

Template.studentRegForm.events({

  // Create the submit form function
  // *******************************

  'submit form': function(event, template) {  // not sure what the template is....

    // prevents the default functionality of the form
    // **********************************************

    event.preventDefault();


    // Store all the values of the user fields in a variable called options to pass on to the onCreateUser Server function
    // *******************************************************************************************************************

    var options = {

      // user info
      email: $('input[name=email]').val(),
      password: $('input[name=password]').val(),

      // Contact info
      phone: $('input[name=phoneNumber]').val(),

      // personal information
      age: $('input[name=age]').val(),
      image: $('input[name=image]').val()

    }

    // console.log("Options.age is: ");
    // console.log(options.age);
    // console.log("!");

    /* Note:
     $('input[name=email]') grabs the value in the html file at input[name=email]
     -> .val turns it into a js value
     -> all of it gets stored into the field name email
     */

    // add in all embedded document information to options
    // ***************************************************

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
    options.uni_info = {
      uni: $('input[name=uni]').val(),
      program: $('input[name=program]').val(),
      eStatus: $('select[name=enrolmentStatus]').val()
    }

    // Create an ethereum account & store public key address
    // ******************************************************
    /*
    var myAddr = ethCreateAccount();
    options.ethereum = myAddr;
    */

    // Pass the values options with all user fields onto User Accounts
    // ***************************************************************************

    Meteor.call('signup', options, function(error, result) {

      // What happens if methods function returns an error
      // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

      if(error) {

        // display the error on the console log of the website
        console.log(error.reason);

        // Set the lastError variable
        template.lastError.set(error.reason);

      }

      // What happens if methods function works fine
      // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

      else {

        // Set the lastError to null
        template.lastError.set(null);

        // automatic login for the user
        Meteor.loginWithPassword(options.email, options.password);

        // redirect the user to another page after registration
        FlowRouter.go('/students')
      }

    });

    /* Note:
    function(error,result) is a callback function
    see: http://docs.meteor.com/api/methods.html#Meteor-call
    */
  }
});

// *************************************
// Events allocated to Registration Form
// *************************************

Template.studentRegForm.helpers({
  errorMessage: function () {
    return Template.instance().lastError.get();
  }
});
