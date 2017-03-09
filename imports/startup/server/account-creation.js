// ************************************************************
// Function to pass the new field parameters to user accounts
// ************************************************************


Accounts.onCreateUser(function(options,user) {

  // Error Handling: making sure the account has not already been created
  // ====================================================================

  var newEmail = options.email;
  //console.log(newEmail);
  var emailAlreadyExists = Meteor.users.find({"emails.address": newEmail});

  if(emailAlreadyExists == true) {
    throw new Meteor.Error("emailAlreadyExists", "email already registered");
  }

  // Basic set up of this function that we want to implement
  // -------------------------------------------------------

  /*
   Fill all common info
    If student:
  fill student info
    If donor:
  fill account info
  */

  // Add in non-default parameters
  // -----------------------------

  // Add in name field to user document
  if(options.name) {
    user.name = options.name;
  }

  // Add in age field to user document
  if(options.age) {
    user.age = options.age;
  }

  console.log("in accountOnCreate function");
  // Add in the university information to the user document
  if(options.university) {
    console.log(options.university);
    var uni = Universities.findOne({name: options.university});
    user.university = uni._id;
  }

  // Syntax of Collection.findOne({fields to identify}, {fields to return or exclude})
  // Fields to identify collection by: fieldName: what it needs to be equal to
  // Fields to return/exclude: fieldName: boolean (1 if return, 0 if exclude) --> can only do one or the other
  // findOne() returns a document whereas find() returns a cursor to the doc

  // Want to keep the default hook's profile behavior
  if(options.profile) {
    user.profile = options.profile;
  }


	return user;
});
