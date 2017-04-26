import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { accountCreation } from './account-creation.js';

// Making the chai.assert statement shorter
// ****************************************

var assert = chai.assert;

// Setting up tests for all the Startup/account-creation.js related items
// **********************************************************************

// describe('account-creation', function () {
//
//   // Test for the Accounts.onCreateUser extension
//   // ********************************************
//
//   describe('Accounts.onCreateUser', function () {
//
//     if(Meteor.isServer) {
//
//       let testUser
//
//       beforeEach(function() {
//         resetDatabase();
//
//         testUser = {
//           // common info
//           userType: {
//             isStudent: true,
//             isDonor: true,
//             isUniAdmin: false,
//           },
//           email: "test@test.com",
//           password: "password",
//           password_verification: "password",
//           age: "25",
//           phone: "123456789",
//           image: "photo",
//           ethereum: "etherKey",
//           address: {
//             country: "myCountry",
//             city: "myCity",
//             street: "myStreet",
//             zipCode: "201Hello",
//           },
//           name: {
//             first: "firstName",
//             middle: "middleName",
//             last: "lastName"
//           },
//           // Student only info
//           uni_info: {
//             uni: "myUni",
//             program: "myProgram",
//             eStatus: "myStatus"
//           }
//         };
//
//       });
//
//       afterEach(function(){
//         if(testUser._id) {
//           Meteor.users.remove(testUser._id);
//         }
//       });
//
//       // Check that Accounts.onCreateUser throws an error when email already exists
//       it('throws an error if username/email already exists', function(){
//
//         var emailFind = sinon.stub(Meteor.users,'find');
//         emailFind.withArgs({"email.address": testUser.email}).returns(true);
//
//         assert.throws(
//           function() { Accounts.createUser(testUser) },
//           "emailAlreadyExists",
//           "Error Thrown"
//         );
//
//         emailFind.restore('find');
//
//       });
//
//
//
//
//
//     }
//
//     // Tests for non-server side go here
//
//   });
// });
