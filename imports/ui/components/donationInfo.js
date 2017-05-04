import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './donationInfo.html';

Template.donorProfileDonationInfo.helpers({
  totalDonation: function(){
    var id = FlowRouter.getParam('id');
    return ReactiveMethod.call('totalDonation',id);
  },
})
