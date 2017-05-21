import { Meteor } from 'meteor/meteor';

Meteor.methods({

  checkTarget: function(studentId) {

    console.log("checking if target is reached");
    var user = Meteor.users.findOne({_id: studentId});
    // Set up variables to be used
    // var Balance = ethGetBalance(user.ethereum);

    var Balance = Meteor.call('totalDonation',studentId);
    // Need to define how to check the target
    var Target = user.uni_info.tuition_eth;
    Target += user.uni_info.allowance_eth * 10;

    if(Balance >= Target){
      Meteor.call('updateStatus',user._id,"targetReached");
    }
  }
});
