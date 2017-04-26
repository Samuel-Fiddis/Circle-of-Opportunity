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



  // Tests for the Signup Method go here
  // ***********************************

  describe('Signup Method', function() {

    if(Meteor.isServer) {

      let testUser;

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
          };

          // Call the function to test
          assert.throws(
            function() { Meteor.call('signup', testUser) },
            "No_firstName",
            "Error Thrown" );

        });

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
            };

            // Call the function to test
            assert.throws(
              function() { Meteor.call('signup', testUser) },
              "No_lastName",
              "Error Thrown" );

            });

    }


  });


  // Tests for the Update Method go here
  // ***********************************

  describe('Update Method', function () {

    if(Meteor.isServer) {

      let testUser;

      beforeEach(function () {
        resetDatabase();

        // Create a user if there are none
        if(!Meteor.users.findOne({email: 'test-user@test.net'})) {

          testUser = {
            email: "test-user@test.net",
            password: "testing",
            password_verification: "testing",
            userType: {
              isStudent: true,
              isDonor: true,
              isUniAdmin: false,
            },
          };

          testUser._id = Accounts.createUser(testUser);
        };


      });

      afterEach(function () {

        // remove fake user
        if (testUser._id) {
          Meteor.users.remove(testUser._id);
        };


      });

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

      // write more server side tests for the update method here

    }

    // write more non-server tests for the update method here

  });


  // Tests for the updateInterest Method go here
  // *******************************************

  describe('UpdateInterest Method', function () {

    if(Meteor.isServer) {

      let donor;
      let student;

      beforeEach(function () {

        //console.log("started updateInterest beforeEach");
        resetDatabase();



        // create a fake studentId to register interest in
        if(!Meteor.users.findOne({email: 'student@fake.net'})) {

          student = {
            email: 'student@fake.net',
            password: "studentTest",
            password_verification: "studentTest",
            userType: {
              isStudent: true,
              isDonor: true,
              isUniAdmin: false,
            }
          };

          student._id = Accounts.createUser(student);
          //console.log(studentId);
        };
        //console.log("fin de updateInterest beforeEach");

        // create a fake "loggedIn" donor
        if(!Meteor.users.findOne({email: 'donor@loggedIn.net'})) {

          donor = {
            email: 'donor@loggedIn.net',
            password: "donorTest",
            password_verification: "donorTest",
            userType: {
              isStudent: false,
              isDonor: true,
              isUniAdmin: false,
            },
            // interestStudent: [student._id],
          };

          donor._id = Accounts.createUser(donor);

        };
      });

      afterEach(function () {

        //console.log("started updateInterest afterEach");

        // remove fake loggedIn donor
        if(donor._id) {
          Meteor.users.remove(donor._id);
        };

        if(student._id) {
          Meteor.users.remove(student._id);
        };

        //console.log("fin de updateInterest afterEach");

      });

      it('UpdateInterest: throws an error if studentId doesnt belong to a student', function() {

        // Call update interest to test if it properly throws an error
        assert.throws(
          function() { Meteor.call('updateInterest', donor._id)},
          "not-authorized1",
          "Error Thrown"
        );

      });

      it('UpdateInterest: throws an error if the person calling this isnt loggedIn', function() {

        // Stub Meteor.userId() so it returns fake loggedIn donor id
        var userId = sinon.stub(Meteor,'userId');
        userId.returns(null);

        // call UpdateInterest to test it properly throws an error
        assert.throws(
          function () { Meteor.call('updateInterest', student._id) },
          "not-authorized2",
          "Error Thrown" );

          userId.restore('userId');
      });

      it('updateInterest: throws an error if the person calling this is not a donor', function() {

        // create a fake nondonor
        if(!Meteor.users.findOne({email: 'notdonor@loggedIn.net'})) {

          nondonor = {
            email: 'notdonor@loggedIn.net',
            password: "notdonorTest",
            password_verification: "notdonorTest",
            userType: {
              isStudent: false,
              isDonor: false,
              isUniAdmin: true,
            },
          };

          nondonor._id = Accounts.createUser(nondonor);

        };

        var userId = sinon.stub(Meteor,'userId');
        userId.returns(nondonor._id);

        // call updateInterest to test it properly throws an error
        assert.throws(
          function () { Meteor.call('updateInterest', student._id) },
          "not-authorized3",
          "Error Thrown"
        );

        userId.restore('userId');
        if(nondonor._id) {
          Meteor.users.remove(nondonor._id);
        }

      });

      it('updateInterest: throws an error if student is registering interest in themselves', function() {

        var userId = sinon.stub(Meteor,'userId');
        userId.returns(student._id);

        assert.throws(
          function () { Meteor.call('updateInterest', student._id) },
          "not-authorized4",
          "Error Thrown"
        );

        userId.restore('userId');
      });

      // it('updateInterest: throws an error if person has registered interest in this person before', function() {
      //
      //   var userId = sinon.stub(Meteor,'userId');
      //   userId.returns(donor._id);
      //
      //   assert.throws(
      //     function() { Meteor.call('updateInterest', student._id) },
      //     "not-authorized4",
      //     "Error Thrown"
      //   );
      //
      //   userId.restore('userId');
      //
      // })

      it('updateInterest calls Meteor.users.update twice', function(done) {

        var userId = sinon.stub(Meteor,'userId');
        userId.returns(donor._id);

        var update = sinon.stub(Meteor.users,'update');

        Meteor.call('updateInterest',student._id);

        userId.restore('userId');
        update.restore('update');

        sinon.assert.calledTwice(update);

        done();
      })

      // write more server-side tests for the updateInterest method here
    }



    // write more non-server side tests for the updateInterest method here

  });


  // Tests for the updateStatus Method go here
  // *****************************************

  describe('UpdateStatus Method', function () {

    if(Meteor.isServer) {

      let testStudent;

      beforeEach(function() {
        resetDatabase();

        // create fake student
        testStudent = {
          email: "testStudent@student.net",
          password: "fakeStudent",
          password_verification: "fakeStudent",
          userType: {
            isStudent: true,
            isDonor: true,
            isUniAdmin: false,
          }
        },

        testStudent._id = Accounts.createUser(testStudent);

      });

      afterEach(function() {

        if(testStudent._id) {
          Meteor.users.remove(testStudent._id);
        };

      });

      it('UpdateStatus: calls Meteor.update once', function(done) {

        // stub the Meteor.update
        var update = sinon.stub(Meteor.users,'update');

        // create fake status update
        var newStatus = "fakeNewStatus";

        // call UpdateStatus
        Meteor.call('updateStatus',testStudent._id,newStatus);

        // correctly restore functionality of stubs
        update.restore('update');

        // check update was called once
        sinon.assert.calledOnce(update);

        done();
      });

      // write more server-side tests for updateStatus method here
    }

    // write more non-server side tests for updateStatus method here
  });

// Write more tests for the USER suite here

});
