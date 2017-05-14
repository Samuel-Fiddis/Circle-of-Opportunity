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
    var studentId = String($('input[name=fill_id]').val()) ;
    var options = {
      studentId : studentId
    }

 	Meteor.call('fill_student_contract', options, function(error, result) {
      if(error) {
        console.log("Error Flag");
        console.log(error.reason);
      } else {
        console.log("Student funds sent to contract");
        //  FlowRouter.go('/??')
      }
    });
  },

  'click .fill_all_students': function(event,template) {
 	Meteor.call('fill_all_students', function(error, result) {
      
      if(error) {
        console.log("Error Flag");
        console.log(error.reason);
      } else {
        console.log("All student funds sent to contract");
        //  FlowRouter.go('/??')
      }
    });
  },

  'click .get_student_balance': function(event,template) {

    // Read the student ID passed in
    var studentId = String($('input[name=get_balance_id]').val()) ;
    var options = {
      studentId : studentId
    }

 	Meteor.call('get_student_contract_balance', options, function(error, result) {
      
      if(error) {
        console.log("Error Flag");
        console.log(error.reason);
      } else {
        console.log("Balance returned");
        //  FlowRouter.go('/??')
      }
    });
  },

  'click .forward_student_contract': function(event,template) {

    // Read the student ID passed in
    var studentId = String($('input[name=forward_id]').val()) ;
    var options = {
      studentId : studentId
    }

 	Meteor.call('forward_student_contract', options, function(error, result) {
      
      if(error) {
        console.log("Error Flag");
        console.log(error.reason);
      } else {
        console.log("Forwarded");
        //  FlowRouter.go('/??')
      }
    });
  },

  'click .forward_all_students': function(event,template) {
 	Meteor.call('forward_all_students', function(error, result) {
      
      if(error) {
        console.log("Error Flag");
        console.log(error.reason);
      } else {
        console.log("All student funds sent to their accounts");
        //  FlowRouter.go('/??')
      }
    });
  },

  'click .cancel_student_contract': function(event,template) {

    // Read the student ID passed in
    var studentId = String($('input[name=cancel_id]').val()) ;
    var options = {
      studentId : studentId
    }

 	Meteor.call('cancel_student_contract', options, function(error, result) {
      
      if(error) {
        console.log("Error Flag");
        console.log(error.reason);
      } else {
        console.log("Cancelled");
        //  FlowRouter.go('/??')
      }
    });
  },

  'click .cancel_all_students': function(event,template) {

 	Meteor.call('cancel_all_students', function(error, result) {
      
      if(error) {
        console.log("Error Flag");
        console.log(error.reason);
      } else {
        console.log("All students cancelled");
        //  FlowRouter.go('/??')
      }
    });
  },

  'click .kill_smart_contract': function(event,template) {

    // Read the student ID passed in
    var contractId = String($('input[name=kill_contract_id]').val()) ;
    var options = {
      contractId : contractId
    }

 	Meteor.call('kill_smart_contract', options, function(error, result) {
      
      if(error) {
        console.log("Error Flag");
        console.log(error.reason);
      } else {
        console.log("Killed");
      }
    });
  },

  'click .send_funds': function(event,template) {
    // get ids of studentand donor
    var senderAddress = String($('input[name=sender_address]').val()) ;
    var pwdSender = "password";

    var amount = parseFloat($('input[name=sender_return_amount]').val());

    var receiverAddress = "0x0b0be3d00a30095b38cb4838b355f83ed6693423";
    
    var trans = ethSendEtherTransaction(senderAddress, pwdSender, receiverAddress, amount);

    
  },

  'click .get_balance': function(event,template) {
  	// Read the student ID passed in
    var address = String($('input[name=balance_id]').val()) ;
    var options = {
      address : address
    }
 	Meteor.call('get_balance', options, function(error, result) {
      
      if(error) {
        console.log("Error Flag");
        console.log(error.reason);
      } else {
        console.log("Balance Printed");
      }
    });
  },

});
