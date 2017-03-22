// *********************************
// Events allocated to Register Page
// *********************************


import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './studentRegForm.html';

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
      /*
      phone: $('input[name=phoneNumber]').val(),
      */

      // personal information
      age: $('input[name=age]').val(),
      image: $('input[name=image]').val()

    }

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

    // call the method ethereum to create an account
    // store the public key in a new field
    var myAddr = ethCreateAccount();
    options.ethereum = myAddr;



    // Pass the values options with all user fields onto User Accounts
    // ***************************************************************************

    Meteor.call('signup', options, function(error, result) {

      // What happens if methods function returns an error
      // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

      if(error) {
        // display the error on the console log of the website
        console.log(error.reason);
      }

      // What happens if methods function works fine
      // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

      else {
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
