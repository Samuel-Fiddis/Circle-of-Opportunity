import { Meteor } from 'meteor/meteor';

// *********************************************************************
// File holding all the methods used to connect the server to the client
// **********************************************************************

Meteor.methods({

  signup: function(options) {

    var userId;

    // Error Handling: making sure the form is properly filled in
    // ----------------------------------------------------------

    // Make sure all non-optional fields are filled in
    // ***********************************************

    // ensure the user filled out a password
    // NOTE: the email is automatically checked by meteor

    if(!options.password)
    {
      throw new Meteor.Error("No_password","Please fill out a password");
    }

    // ensure the user has a first and last name

    if(!options.name.first)
    {
      throw new Meteor.Error("No_firstName","Please fill in a first name");
    }

    if(!options.name.last)
    {
      throw new Meteor.Error("No_lastName","Please fill in a last name");
    }

    /* NOTE:
    Syntax for Meteor.Error("identifier","reason")
    the identifier can be used to reference the error
    The reason appears in the console log to explain what went wrong
    */

    // Create the user from the server
    // -------------------------------

    userId = Accounts.createUser(options);
    //console.log(userId);
    return userId;

    /* NOTE:
    On the server side, accounts.createUser does not actually have callback capacities
    Any errors related to actually creating the user are currently stored in the account-creations.js
    */

    // Add in a send enrollment email for example
    // ------------------------------------------

    /*
    if(userID)
    {
      console.log("userId");
      console.log(userId);
      //Accounts.sendEnrollmentEmail(userID);
      return userID;
    }
    */
  }
});
