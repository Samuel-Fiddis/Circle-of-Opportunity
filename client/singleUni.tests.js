import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { withRenderedTemplate } from './test-helpers.js';

import { Universities } from '../collections/Universities';

import './universities/UniversitySingle.js';


describe('UniversitySingle', function () {
  beforeEach(function () {
    resetDatabase(); 
    Template.registerHelper('_', key => key);
  });
  it('builds correctly from factory', function () {
    
    const university = Factory.build('university');
    assert.typeOf(university, 'object');
    assert.typeOf(university.name, 'string' )
    
  });
  it('renders correctly with simple data', function () {
    const university = Factory.build('university');

    // Not sure how to read 'university.name' in template
    //    I believe _transform is needed as Meteor Testing
    //    describes, but not working.
    const data = {
      university: university,
      onEditingChange: () => 0,
      uni_name: university.name
    };

    withRenderedTemplate('UniversitySingle', data, (el) => {
      chai.assert.equal($(el).find('.uni_name').text(), university);
    });
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