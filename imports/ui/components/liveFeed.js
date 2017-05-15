import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Transactions } from '/imports/api/transactions/transactions.js';

import './liveFeed.html'

Template.livefeed.onCreated( function() {

  // Template level subscriptions
  // ****************************

  // Subscribe transactions publication: returns all transactions
  var self = this;

  console.log(FlowRouter.getRouteName());

  self.autorun(function() {
  if(FlowRouter.getParam('id')){
    var userId = FlowRouter.getParam('id');
    self.subscribe('topStudentTransactions', userId, 20);
    self.subscribe('topDonorTransactions', userId, 20);
  }
  else if(FlowRouter.getRouteName() == "donatenow"){
    self.subscribe('topGeneralPotTransactions', 20);
  }
  else{
    self.subscribe('topTransactions', 20);
  }
  });

});

Template.livefeed.helpers({
  transaction: ()=> {
    return Transactions.find({});
  },

  isDtS: function(transaction) {
    return transaction.type == "DtS";
  },

  isGtS: function(transaction) {
    return transaction.type == "GtS";
  },

  isStG: function(transaction) {
    return transaction.type == "StG";
  },

  isDtG: function(transaction) {
    return transaction.type == "DtG";
  },

  isStU: function(transaction) {
    return transaction.type == "StU";
  },

  isStC: function(transaction) {
    return transaction.type == "StC";
  },

  isCtO: function(transaction) {
    return transaction.type == "CtO";
  }
});
