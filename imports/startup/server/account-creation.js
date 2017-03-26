// ************************************************************
// Function to pass the new field parameters to user accounts
// ************************************************************


Accounts.onCreateUser(function(options,user) {

  // Error Handling: making sure the account has not already been created
  // ====================================================================

  var newEmail = options.email;
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

  /* Note: the default parameters automatically added in are email and password */

  // Add in name field to user document
  if(options.name) {
    user.name = options.name;
  }

  // Add in contact field to user document (currently just phone)
  if(options.phone) {
    user.phone = options.phone;
  }

  // Add in address field to user document
  if(options.address) {
    user.address = options.address;
  }

  // Add in age field to user document
  if(options.age) {
    user.age = options.age;
  }

  // Add in image field to user document
  if(options.image) {
    user.image = options.image;
  }

  // Store Ethereum Public Key for this student
  if(options.ethereum) {
    user.ethereum = options.ethereum;
  }

  // Want to keep the default hook's profile behavior
  if(options.profile) {
    user.profile = options.profile;
  }



	return user;
});
