import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { methods } from './methods.js'

// Making the chai.assert statement shorter
// ****************************************

var assert = chai.assert;

// Setting up tests for all the Users/Methods.js related items
// **********************************************************

describe('Users', function () {

  let testUser;

  // Tests for the Signup Method go here
  // ***********************************

  describe('Signup Method', function() {

    beforeEach(function () {
      resetDatabase();
    });

    afterEach(function () {

      if (testUser._id) {
        Meteor.users.remove(testUser._id);
      };
    })

    // Check that signup correctly creates a user when testUser is of the right format
    // *******************************************************************************
    it('Signup: creates a student user', function (done) {

      // define testUser

      testUser = {
        // common info
        userType: "student",
        email: "test@test.com",
        password: "password",
        password_verification: "password",
        age: "25",
        phone: "123456789",
        image: "photo",
        ethereum: "etherKey",
        address: {
          country: "myCountry",
          city: "myCity",
          street: "myStreet",
          zipCode: "201Hello",
        },
        name: {
          first: "firstName",
          middle: "middleName",
          last: "lastName"
        },
        // Student only info
        uni_info: {
          uni: "myUni",
          program: "myProgram",
          eStatus: "myStatus"
        }
      };

      // Call the function to test
      testUser._id = Meteor.call('signup', testUser);

      // get the first user created
      const users = Meteor.users.find({_id: testUser._id}).fetch();
      const user = users[0];

      // Check that the user exist and matches the _id in the user database
      assert.isNotNull(user);
      assert.isDefined(user);
      assert.equal(user._id, testUser._id);

      done();

    });

    // Check that signup correctly creates a user when testUser is of the right format
    // *******************************************************************************
    it('Signup: creates a donor user', function (done) {

      // define testUser

      testUser = {
        // common info
        userType: "donor",
        email: "test@test.com",
        password: "password",
        password_verification: "password",
        age: "25",
        phone: "123456789",
        image: "photo",
        ethereum: "etherKey",
        address: {
          country: "myCountry",
          city: "myCity",
          street: "myStreet",
          zipCode: "201Hello",
        },
        name: {
          first: "firstName",
          middle: "middleName",
          last: "lastName"
        },
        // donor specific info
        company_info: {
          company: "myCompany",
          position: "myPosition",
        }
      };

      // Call the function to test
      testUser._id = Meteor.call('signup', testUser);

      // get the first user created
      const users = Meteor.users.find({_id: testUser._id}).fetch();
      const user = users[0];

      // Check that the user exist and matches the _id in the user database
      assert.isNotNull(user);
      assert.isDefined(user);
      assert.equal(user._id, testUser._id);

      done();

    });

    // Check that signup throws an error with appropriate error message if email is missing
    // ************************************************************************************
    it('Signup: error thrown when password is missing', function() {

      testUser = {
        // common info - missing password
        userType: "donor",
        email: "test@test.net",
        password_verification: "password",
        age: "25",
        phone: "123456789",
        image: "photo",
        ethereum: "etherKey",
        address: {
          country: "myCountry",
          city: "myCity",
          street: "myStreet",
          zipCode: "201Hello",
        },
        name: {
          first: "firstName",
          middle: "middleName",
          last: "lastName",
        }
      }

      // Call the function to test
      assert.throws(
        function() { Meteor.call('signup', testUser) },
        "No_password",
        "Error Thrown" );

      });



    // Check that signup throws an error with appropriate error message if firstName is missing
    // ************************************************************************************
    it('Signup: error thrown when firstName is missing', function() {

        testUser = {
          // common info - missing email field
          userType: "donor",
          email: "test@test.net",
          password: "password",
          password_verification: "password",
          age: "25",
          phone: "123456789",
          image: "photo",
          ethereum: "etherKey",
          address: {
            country: "myCountry",
            city: "myCity",
            street: "myStreet",
            zipCode: "201Hello",
          },
          name: {
            middle: "middleName",
            last: "lastName"
          }
        }

        // Call the function to test
        assert.throws(
          function() { Meteor.call('signup', testUser) },
          "No_firstName",
          "Error Thrown" );

        })

        // Check that signup throws an error with appropriate error message if lastName is missing
        // ************************************************************************************
        it('Signup: error thrown when lastName is missing', function() {

          testUser = {
            // common info - missing lastName field
            userType: "donor",
            email: "test@test.net",
            password: "password",
            password_verification: "password",
            age: "25",
            phone: "123456789",
            image: "photo",
            ethereum: "etherKey",
            address: {
              country: "myCountry",
              city: "myCity",
              street: "myStreet",
              zipCode: "201Hello",
            },
            name: {
              first: "firstName",
              middle: "middleName",
            }
          }

          // Call the function to test
          assert.throws(
            function() { Meteor.call('signup', testUser) },
            "No_lastName",
            "Error Thrown" );

          })
    });


  // Tests for the Update Method go here
  // ***********************************

  describe('Update Method', function () {

    beforeEach(function () {
      resetDatabase();

      testUser = {
        // common info
        userType: "student",
        email: "test@test.com",
        password: "password",
        password_verification: "password",
        age: "25",
        phone: "123456789",
        image: "photo",
        ethereum: "etherKey",
        address: {
          country: "myCountry",
          city: "myCity",
          street: "myStreet",
          zipCode: "201Hello",
        },
        name: {
          first: "firstName",
          middle: "middleName",
          last: "lastName"
        },
      }

      testUser._id = Meteor.call('signup', testUser);
      console.log(testUser._id);

    });

    afterEach(function () {
      if (testUser._id) {
        Meteor.users.remove(testUser._id);
      };
    })

    // Check that update appropriately updates a user
    // **********************************************

    it('Update: updates a student user', function (done) {

      // declare updateInfo
      let updateInfo

      // define updateInfo
      updateInfo = {

        age: "newAge",
        phone: "newPhone",
        bio: "myStory in detail",

        address: {
          country: "newCountry",
          city: "newCity",
          street: "newStreet",
          zipCode: "newZipCode",
        },

        name: {
          first: "newFirstName",
          middle: "newMiddleName",
          last: "newLastName"
        },
      };

      // grab the information before the call --> check that equal to previous information
      Meteor.call('updateUser', updateInfo);

      // grab the information after the call --> check that equal to updateInfo

      // get the first user created
      const users = Meteor.users.find({_id: testUser._id}).fetch();
      const user = users[0];

      // Check that the user exist and matches the _id in the user database
      assert.isNotNull(user);
      assert.isDefined(user);
      assert.equal(user._id, testUser._id);

      done();
    });

    // write more tests for the update method here

  })

});
