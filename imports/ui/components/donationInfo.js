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

});

// --------------------------------------
// STUDENT PROFILE DONATION INFO Template
// --------------------------------------

Template.studentProfileDonationInfo.helpers({

  totalDonation: function(){
    var id = FlowRouter.getParam('id');
    return ReactiveMethod.call('totalDonation',id);
  },

})
