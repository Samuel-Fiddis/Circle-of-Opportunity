import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './demoButtons.html';

Template.demobuttons.events({

  'click .general_pot_allocation': function(event,template) {
    Meteor.call('reallocate');
  },
  'click .smart_contract_creation': function(event,template) {
    Meteor.call('create_contract');
  },
  'click .fill_student_contract': function(event,template) {

    // Read the student ID passed in
    var studentId = String($('input[name=student_id]').val()) ;
    var options = {
      studentId : studentId
    }

 	Meteor.call('fill_student_contract', options, function(error, result) {
      
      if(error) {
        // display the error on the console log of the website
        console.log("Error Flag");
        console.log(error.reason);
      }
      // What happens if methods function works fine
      else {
        // Set the lastError to null
        //template.lastError.set(null);
        console.log("transaction done");
        // redirect the user to another page after registration
        //  FlowRouter.go('/??')
      }
    });
  }

});
