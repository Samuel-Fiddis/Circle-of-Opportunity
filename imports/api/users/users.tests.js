import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { resetDatabase } from 'meteor/xolvio:cleaner';

var assert = chai.assert;

describe('Users', function () {
  
  let testUser;

  beforeEach(function () {
    resetDatabase(); 

    testUser = {
      email: "test@test.com",
      password: "password",
      age: "25",
      name: {
        first: "firstName",
        last: "lastName"
      }
    };
  });

  afterEach(function () {
    if (testUser._id)
      Meteor.users.remove(testUser._id);
  })


  it('AddUser', function (done) {
    testUser._id = Meteor.call('addUser', testUser);
    const users = Meteor.users.find({_id: testUser._id}).fetch();
    const user = users[0];
    assert.isNotNull(user);
    assert.isDefined(user);
    assert.equal(user._id, testUser._id);
    done();
  });
});

