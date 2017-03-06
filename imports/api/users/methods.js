import { Meteor } from 'meteor/meteor';

// *********************************************************************
// File holding all the methods used to connect the server to the client
// **********************************************************************

Meteor.methods({
  signup: function(options) {

    // debugging
    /*
    console.log('inside the signup method');
    console.log(options.first_name);
    */

    // Error Handling
    // --------------

    // ensure the user is logged in
    /*
    if (!user)
    {
      throw new Meteor.Error(401, "Can't make a user without a user object");
    }
    */

    // ensure the user has a name
    /*
    if(!user.email)
    {
      throw new Meteor.Error(422, 'Please fill in an email address');
    }
    */

    // ensure there is an email
    /*
    if(!user.password)
    {
      throw new Meteor.Error(424, 'Please fill in a password');
    }
    */

    // Create the user from the server
    // -------------------------------

    // debugging
    /*
    console.log('calling createUser');
    */
    
    var userId = Accounts.createUser(options);

    // Add in a send enrollment email for example
    // ------------------------------------------

    /*
    if(userID)
    {
      Accounts.sendEnrollmentEmail(userID);
      return userID;
    }
    */
  }
});