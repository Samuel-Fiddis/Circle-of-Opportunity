import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Universities } from './universities.js';


// for now: unnecessary import statements
//import { Template } from 'meteor/templating';
//import { $ } from 'meteor/jquery';
//import { withRenderedTemplate } from './test-helpers.js';
// import {faker} from 'faker';




// Defining a stub for the University Collection Document
// ******************************************************

Factory.define('university', Universities, {
	name: "A University",
	address: "An Address"
});

// Making the chai.assert statement shorter
// ****************************************

var assert = chai.assert;


// Setting up tests for all the Universities.js related items
// **********************************************************

describe('Universities', function () {

  // Cleaning up the database appropriately before each tests
  beforeEach(function () {
    resetDatabase();
  });

  // Test 1: checking the university gets built appropriately from factory
  it('builds correctly from factory', function () {

    const university = Factory.build('university');
    assert.typeOf(university, 'object');
    assert.typeOf(university.name, 'string' );
    assert.typeOf(university.address, 'string');

  });

  // more tests can go here

});
