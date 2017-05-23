import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Transactions } from '/imports/api/transactions/transactions.js';

import './liveFeed.html'
import '/imports/api/users/helpers.js'

Template.livefeed.onCreated( function() {

  // Template level subscriptions
  // ****************************

  // Subscribe transactions publication: returns all transactions
  var self = this;

  console.log(FlowRouter.getRouteName());
  self.subscribe('allUserImageInfo');
  self.autorun(function() {
  if(FlowRouter.getParam('id')){
    var userId = FlowRouter.getParam('id');
    self.subscribe('topStudentTransactions', userId, 20);
    self.subscribe('topDonorTransactions', userId, 20);

    // Trying to get Contract Transactions Subscribed to

    //var student_ext_eth = Meteor.users.findOne({_id: userId}).ethereum_ext;
    //console.log("Contract Address:");
    //console.log(Meteor.settings.contractAddress);

    //self.subscribe('topStudentTransactions', student_ext_eth, 20);
    //self.subscribe('topDonorTransactions', Meteor.settings.contractAddress, 20);
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
    return Transactions.find({}, {sort:{createdAt:-1}, reactive:true});
  },

  ethToPound: function(amount) {
    return Number((amount * 100.0).toFixed(2));
  },

  eth: function(amount) {
    return Number((amount).toFixed(2));
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
  },

  receiverImage : function (){
    const user = Meteor.users.findOne({"_id": this.idReceiver});
    if(typeof user.userImage().currentFile !== "undefined"){
      console.log(user.userImage().currentFile);
      currentFile = user.userImage().currentFile;
      image = user.userImage()
    }
    return image;
  },

  senderImage : function (){
    const user = Meteor.users.findOne({"_id": this.idSender});
    if(typeof user.userImage().currentFile !== "undefined"){
      console.log(user.userImage().currentFile);
      image = user.userImage()
    }
    return image;
  }
});
