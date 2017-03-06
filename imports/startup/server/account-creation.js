// ************************************************************
// Function to pass the new field parameters to user accounts
// ************************************************************


Accounts.onCreateUser(function(options,user) {

  // debugging
  /*
  console.log('in onCreateUser');
  console.log(options.first_name);
  */

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

  // Want to keep the default hook's profile behavior
  if(options.profile) {
    user.profile = options.profile;
  }


	return user;
});