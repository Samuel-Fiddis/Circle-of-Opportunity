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
        userType: {
          isStudent: true,
          isDonor: true,
          isUniAdmin: false,
        },
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
        userType: {
          isStudent: false,
          isDonor: true,
          isUniAdmin: false,
        },
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
        userType: {
          isStudent: true,
          isDonor: true,
          isUniAdmin: false,
        },
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
          // common info - missing firstName field
          userType: {
            isStudent: true,
            isDonor: true,
            isUniAdmin: false,
          },
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
            userType: {
              isStudent: true,
              isDonor: true,
              isUniAdmin: false,
            },
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

      // Create a user if there are none
      if(!Meteor.users.findOne({email: 'test-user@test.net'})) {

        testUser = {
          email: "test-user@test.net",
          password: "testing",
        };

        testUser._id = Accounts.createUser(testUser);
      };


    });

    afterEach(function () {

      // remove fake user
      if (testUser._id) {
        Meteor.users.remove(testUser._id);
      };

    })

    // Check that update calls Meteor.update once
    // *******************************************

    it('Update: calls Meteor.update once when no errors happen', function (done) {

      // Stub the Meteor.userId() so it returns the id of the created testUser
      var userId = sinon.stub(Meteor,'userId');
      userId.returns(testUser._id);

      // Stub the Meteor.users.update()
      var update = sinon.stub(Meteor.users,'update');

      // Get the variable that will be passed on the updateUser
      var updateInfo = {

        phone: "myPhone",
        age: "myAge",
        bio: "myBio",

        name:
        {
          first: "myfirstName",
          middle: "mymiddleName",
          last: "mylastName",
        },

        address:
        {
          country: "myCountry",
          city: "myCity",
          street: "myStreet",
          zipCode: "myZipCode",
        }
      };

      // call updateUser
      Meteor.call('updateUser',updateInfo);

      // correctly restore the functionality of stubs
      userId.restore('userId');
      update.restore('update');

      // check update was called once
      sinon.assert.calledOnce(update);

      done();
    });

    // write more tests for the update method here

  })

});
