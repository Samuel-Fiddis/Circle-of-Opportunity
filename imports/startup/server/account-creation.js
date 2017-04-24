// *****************************************************************************
// Function extending the fields in user accounts
// *****************************************************************************

import { Universities } from '/imports/api/universities/universities.js';

Accounts.onCreateUser(function(options,user) {

  /*
  NOTE: : Basic set up of this function that we want to implement
   Fill all common info
    If student:
  fill student info
    If donor:
  fill account info
  */

  // Error Handling:
  // ---------------

  // making sure the username/email has not already been created
  // ************************************************************

  var newEmail = options.email;
  var emailAlreadyExists = Meteor.users.find({"emails.address": newEmail});

  if(emailAlreadyExists == true) {
    throw new Meteor.Error("emailAlreadyExists", "email already registered");
  }

  // making sure the password matches password verification
  // ******************************************************

  var password = options.password;
  var password_verification = options.password_verification;

  if(password != password_verification) {
    throw new Meteor.Error("passwordsDontMatch", "passwords do not match");
  }


  // Student only Information
  // ------------------------

  if(options.userType.isStudent) {

    // Add in university information to user document
    if(options.uni_info) {
      user.uni_info = options.uni_info;

      // Checking if Imperial College already exists (if it doesnt, create it)
      // NOTE: To be deleted or changed after University interface is set up
      if(Universities.findOne({name: options.uni_info.uni}) == null) {
        Universities.insert({name: options.uni_info.uni, address: "huxley"});
      }

      // Changing the university name field to the university _id of db doc
      var uni = Universities.findOne({name: options.uni_info.uni});
      user.uni_info.uni = uni._id;
    }
  }

  // Add in the userType
  if(options.userType) {
    user.userType = options.userType;
  }


  // Add in the company_info
  if(options.company_info) {
    user.company_info = options.company_info;
  }


  // Add in non-default parameters
  // -----------------------------

  /*
  NOTE: the default parameters automatically added in are email and password
  */

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

  // Store Ethereum Public Key for this user
  if(options.ethereum) {
    user.ethereum = options.ethereum;
  }

  // Want to keep the default hook's profile behavior
  if(options.profile) {
    user.profile = options.profile;
  }

  // Send email notifying user their profile has been created
  //  Must set environment variable MAIL_URL
  //    MAIL_URL='smtp://USERNAME:PASSWORD@HOST:PORT'
  //    export MAIL_URL
  //    For Gmail: HOST=smtp.gmail.com, PORT=587
  /*
  to_email = user.name.first + " <" + newEmail + ">"
  Meteor.call(
    'sendEmail',
    to_email,
    // from email is being set to MAIL_URL email above
    'from_email@not_working.com',
    'Hello from COO!',
    'This is a test of Email.send.'
  );
  */
	return user;
});
