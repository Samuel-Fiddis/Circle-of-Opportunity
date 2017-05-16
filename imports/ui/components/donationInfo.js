import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './donationInfo.html';

// ------------------------------------
// DONOR PROFILE DONATION INFO Template
// ------------------------------------
Template.donorProfileDonationInfo.helpers({

  totalDonation: function(){
    var id = FlowRouter.getParam('id');
    return ReactiveMethod.call('totalDonation',id);
  },

  student: function(){
    var id = FlowRouter.getParam('id');
    return ReactiveMethod.call('DonatedTo',id);
  },

  generalPot: function(name){
    return name == "general";
  }

});


// --------------------------------------
// STUDENT PROFILE DONATION INFO Template
// --------------------------------------
Template.studentProfileDonationInfo.helpers({
  totalDonation: function(){
    var id = FlowRouter.getParam('id');
    return ReactiveMethod.call('totalDonation',id);
  },

  donor: function(){
    var id = FlowRouter.getParam('id');
    return ReactiveMethod.call('DonatedTo',id);
  },

  progressPerc: function(){
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    max = user.uni_info.tuition_eth + user.uni_info.allowance_eth * 10;
    // Should be calling balance from Ethereuem
    // current = ReactiveMethod.call('totalDonation',id);
    current = ethGetBalance(user.ethereum);
    return (current/max)*100;
  }

})
