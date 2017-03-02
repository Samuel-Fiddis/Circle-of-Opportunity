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
  });

  it('renders correctly with simple data', function () {
    const university = Factory.build('university', 
    	{ 
    		name: "Imperial College",
    		address: "Queen's Road"

    	});
    const data = {
      
      university,
      name:"Corey",
      onEditingChange: () => 0,
      
    };

    withRenderedTemplate('UniversitySingle', data, (el) => {
      console.log(data.university.name);
      console.log($(el).find('.name'));
      chai.assert.equal($(el).find('.name').text(), "Corey");
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