import { Meteor } from 'meteor/meteor';

Meteor.methods({

  checkTarget: function(studentId) {

    console.log("checking if target is reached");
    var user = Meteor.users.findOne({_id: studentId});
    console.log(user);
    // Set up variables to be used
    var Balance = ethGetBalance(user.ethereum);
    // Need to define how to check the target
    var Target = user.uni_info.tuition_eth;
    Target += user.uni_info.allowance_eth * 10;
    console.log(Target);

    if(Balance == Target){
      Meteor.call('updateStatus',user._id,"targetReached");
      console.log(user._id);
      console.log("target reached");
    }
  }
});
