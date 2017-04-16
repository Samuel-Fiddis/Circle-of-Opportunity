import { chai } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';


if(Meteor.isClient) {

// import './studentRegForm.html';
import './studentRegForm.js';
// import { studentRegFormHTML } from './studentRegForm.html';

var assert = chai.assert

/*
describe('studentRegForm.OnCreate', function() {

  it('it should create a null reactive var', function () {

  });

  // you can have more tests here


});
*/

describe('studentRegForm.Helpers', function() {

  it('should return an empty array', function () {

    var test = Template.studentRegForm._helpers[' testingHelpers'].apply();
    assert.isArray(test);

  });
});

/* Testing an Array
var arr = [];
assert.equal(arr.length, 0)
*/
}
