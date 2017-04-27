import { Meteor } from 'meteor/meteor';

// *****************************************************************************
// File holding all the methods used to connect the server to the client
// *****************************************************************************


Meteor.methods({

  // Function for the signup method
  // ------------------------------

  signup: function(options) {

    var userId;

    // Error Handling: making sure the form is properly filled in
    // **********************************************************

    /*
    NOTE: the email is automatically checked by meteor
    */


    // ensure the user filled out a password
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

    /*
    NOTE: Syntax for Meteor.Error("identifier","reason")
    the identifier can be used to reference the error
    The reason appears in the console log to explain what went wrong
    */

    // Validation check
    // *****************

    /*
    NOTE: Need to look into an if statement if it gets called from the donor as well
    or maybe putting somethings as null here...
    */

    /*
    NOTE: Doing a validation check on the argument passed to a Method is:
    1. For security purposes
    2. Generally recognized as good practice
    3. Can be done using simpleSchema or check package

    see also:
    https://docs.meteor.com/api/check.html
    https://themeteorchef.com/blog/securing-meteor-applications
    http://meteortips.com/first-meteor-tutorial/methods/
    */

    // var myAddr = ethCreateAccount();
    // options.ethereum = myAddr;

    check(options,
      {
        // All users will have the following upon registration
        userType: {
          isStudent: Boolean,
          isDonor: Boolean,
          isUniAdmin: Boolean,
        },
        email: String,
        password: String,
        password_verification: String,
        phone: String,
        age: String,
        image: String,
        ethereum: String,
        name:
        {
          first: String,
          middle: String,
          last: String,
        },
        address:
        {
          country: String,
          city: String,
          street: String,
          zipCode: String,
        },

        // Only students will have the following fields upon registration
        uni_info: Match.Maybe(
          {
            uni: Match.Maybe(String),
            program: Match.Maybe(String),
            eStatus: Match.Maybe(String),
          }
        ),

        // Only donors will have the following fields upon registration
        company_info: Match.Maybe(
          {
            company: Match.Maybe(String),
            position: Match.Maybe(String),
          }
        ),
      }
    )

    // Create the user from the server
    // -------------------------------

    userId = Accounts.createUser(options);
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
  },

  // Function for the updateUser method
  // ----------------------------------

  updateUser: function(options) {

    // validation check
    // ****************

    /*
    NOTE: Doing a validation check on the argument passed to a Method is:
    1. For security purposes
    2. Generally recognized as good practice
    3. Can be done using simpleSchema or check package

    see also:
    https://docs.meteor.com/api/check.html
    https://themeteorchef.com/blog/securing-meteor-applications
    http://meteortips.com/first-meteor-tutorial/methods/
    */

    check(options,
        {
          phone: String,
          age: String,
          bio: String,

          name:
          {
            first: String,
            middle: String,
            last: String,
          },

          address:
          {
            country: String,
            city: String,
            street: String,
            zipCode: String,
          }
        });

    // Conditional statement: only LoggedIn User can call this Method
    // **************************************************************

    var currentUserId = Meteor.userId();

    if(currentUserId)
    {
      // Call Meteor.users.update()
      // **************************

      Meteor.users.update(
        { _id: currentUserId },
        { $set:
          {
            bio: options.bio,
            age: options.age,
            phone: options.phone,
            name: options.name,
            address: options.address,
          }
        }
      );

    }
  },

  // Function to update DonorInterest in student method
  // --------------------------------------------------

  updateInterest: function(studentId) {

    // validation check
    // ================
    check(studentId, String);

    // want to check that the studentId belongs to an actual student
    var matchingStudent = Meteor.users.find({_id: studentId, "userType.isStudent": true}).count();

    if(matchingStudent == 0) {
      throw new Meteor.Error('not-authorized1','you are not registering interest in a student')
    }

    // authentication check
    // ====================

    // want to check that the person calling this function is the currentUser
    var currentUserId = Meteor.userId();

    if(! currentUserId ) {
      throw new Meteor.Error('not-authorized2','you are not logged in');
    }

    // want to check that the person calling this function is an actual donor
    var user = Meteor.users.findOne({_id: currentUserId});

    if(!user.userType.isDonor) {
      throw new Meteor.Error('not-authorized3','you are not a donor');
    }

    // want to check that a student is not calling registerInterest on themselves
    if(currentUserId == studentId) {
      throw new Meteor.Error('not-authorized4','you can not register interest in yourself');
    }

    // want to check that the person calling this function has not registered an interest in this student before
    var matchingDoc = Meteor.users.find({_id: currentUserId, interestStudent: studentId}).count();

    if(matchingDoc>0) {
      throw new Meteor.Error('not-authorized5','you have already registered interest for this student');
    }


    // update studentUser Interest field
    // =================================

    Meteor.users.update(
      { _id: studentId },
      {
        // increment number of donors interested by 1
        $inc:
        {
          number_dInterest: 1,
        },

        // add the _id of interested donors in an array
        $addToSet:
        {
          interestedDonors: currentUserId,
        },
      }
    );

    // update the Donor's fields
    Meteor.users.update(
      { _id: currentUserId },
      {
        // add the _id of the student the donor is interested in
        $addToSet:
        {
          interestStudent: studentId,
        },
      }
    );
  },


  updateStatus: function(studentId, newStatus) {

    // validation check
    // ================
    check(studentId, String);


    // authentication check
    // ====================


    // update studentUser eStatus field
    // =================================

    Meteor.users.update(
      { _id: studentId },
      {
        // set new status
        $set:
        {
          "uni_info.eStatus": newStatus,
        }
      }
    );

  },


  // Add more methods that pertain to Metor.users here

});
