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

  'submit form': function(event) {  // -- the "event" inside the function might be optional

  //debugging
  /*
  console.log('register.event started');
  */

    // prevents the default functionality of the form
    // **********************************************

    event.preventDefault();


    // Store all the values of the user fields in a variable called options to pass on to the onCreateUser Server function
    // *******************************************************************************************************************

    var options = {

      // $('input[name=email]') grabs the value in the html file at input[name=email]
      // -> .val turns it into a js value
      // -> all of it gets stored into the field name email

      email: $('input[name=email]').val(),
      password: $('input[name=password]').val(),
      age: $('input[name=age]').val()
    }

    // add in all embedded document information to options
    // ***************************************************

    options.name = {
      first: $('input[name=firstName]').val(),
      last: $('input[name=lastName]').val()
    }

    // debugging
    /*
    console.log(options.first_name);
    */

    // Pass the values options with all user fields onto User Accounts
    // ***************************************************************************

    // debugging
    /*
    console.log('calling Meteor.call signup method');
    */

    Meteor.call('signup',options);

    /*
    // Need to change to Meteor.call('signup',user,function(error,id))
    // function(error,id) is a callback function
    // see: http://docs.meteor.com/api/methods.html#Meteor-call

    Meteor.call('signup', user, function(error,id) {

      if(error) {
        // display the error to the user
        console.log(error);
      }

      else {
        // redirect the user to another page after registration
        router.go('/');
      }

      }
    })
    */

  }
});