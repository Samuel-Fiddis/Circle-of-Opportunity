import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './donationInfo.html';

Template.donorProfileDonationInfo.onCreated(function(){
  var self = this;
  self.autorun(function(){
    var id = FlowRouter.getParam('id');
    self.subscribe('thisUserTransactions',id);
  });
});

Template.donorProfileDonationInfo.helpers({

  totalDonation: function(){
    var id = FlowRouter.getParam('id');
    return ReactiveMethod.call('totalDonation',id);
  },

  student: function(){
    var id = FlowRouter.getParam('id');
    return ReactiveMethod.call('studentDonatedTo', id);
  },


});

Template.studentProfileDonationInfo.onCreated(function(){
  var self = this;
  self.autorun(function(){
    var id = FlowRouter.getParam('id');
    self.subscribe('thisUserTransactions',id);
  });
});

Template.studentProfileDonationInfo.helpers({
  totalDonation: function(){
    var id = FlowRouter.getParam('id');
    return ReactiveMethod.call('totalDonation',id);
  }
});
