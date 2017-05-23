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

    if(options.userType.isStudent && !options.pledge)
    {
      throw new Meteor.Error("No_pledge","Please confirm your pledge");
    }

    // Validation check
    // *****************

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
        phone: Match.Maybe(String),
        age: String,
        image: String,
        ethereum: String,
        allowance: Match.Maybe(Boolean),
        pledge: Match.Maybe(Boolean),
        ethereum_ext: Match.Maybe(String),
        name:
        {
          first: String,
          middle: Match.Maybe(String),
          last: String,
        },
        address: Match.Maybe(
        {
          country: Match.Maybe(String),
          city: Match.Maybe(String),
          street: Match.Maybe(String),
          zipCode: Match.Maybe(String),
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

  },

  // Function for the updateUser method
  // ----------------------------------

  updateUser: function(options) {

    // validation check
    // ****************

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
          },
          ethereum_ext: Match.Maybe(String),
          image: String,
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
            image: options.image,
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

    if(newStatus!="graduated") {
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

    }
    else {
      Meteor.users.update(
        { _id: studentId },
        {
          // set new status
          $set:
          {
            "userType.isStudent": false,
            "userType.isDonor": true,
            "userType.isFormerStudent": true,
            "uni_info.eStatus": newStatus,
          }
        }
      );
    }
  },
});
