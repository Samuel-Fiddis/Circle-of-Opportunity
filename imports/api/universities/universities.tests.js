import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { withRenderedTemplate } from './test-helpers.js';

import { Universities } from './universities.js';


describe('Universities', function () {
  beforeEach(function () {
    resetDatabase(); 
  });
  it('builds correctly from factory', function () {
    
    const university = Factory.build('university');
    assert.typeOf(university, 'object');
    assert.typeOf(university.name, 'string' )
    
  });
});


var assert = chai.assert;

// Use 'describe' to say what we're testing
describe('Array', function() {
  // Each 'it' function is an individual test
  it('should start empty', function() {
    var arr = [];

    assert.equal(arr.length, 0)
  });

  // We can have more its here
});