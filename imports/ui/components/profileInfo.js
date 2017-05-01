import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Universities } from '/imports/api/universities/universities.js'

import './profileInfo.html';

// TEMPLATE OPPORTUNITY INFO JAVASCRIPT FUNCTIONALITY
// ==================================================

Template.opportunityInfo.onCreated(function() {

  var self = this;

  self.autorun(function(){

    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    var uniId = user.uni_info.uni;

    self.subscribe('singleUniversity', uniId);

  });

});

Template.opportunityInfo.helpers({

  // uniProfile returns this users's attributed university Profile document
  // **********************************************************************

  uniProfile: ()=> {

    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    var uniId = user.uni_info.uni;
    return Universities.findOne({_id: uniId});

  },

})


// TEMPLATE ETHEREUM PAYMENT INFO JAVASCRIPT FUNCTIONALITY
// =======================================================

Template.ethereumPaymentInfo.helpers({

  // balance is the balance on the current user's ethereum account
  // *************************************************************

  balance: function() {
    var myEthAddr = this.ethereum;
    console.log(myEthAddr);
    return ethGetBalance(myEthAddr);
  },

})
