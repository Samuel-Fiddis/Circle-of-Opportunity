import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Transactions } from '/imports/api/transactions/transactions.js';


import './profilepage.html';

// *****************************************************************************
// What happens when you create the template
// *****************************************************************************

// OnCreated function for the template --> is run when page is rendered
// --------------------------------------------------------------------

Template.profilepage.onCreated( function() {

  // Template level subscriptions
  // ****************************

  // Subscribe thisUser publication: returns the entire user document for the currently logged in user
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleUser', id);

    var idD = Meteor.userId();
    self.subscribe('thisUser', idD);
    self.subscribe('transactions');
  });
  //var userId = Meteor.userId();
  //this.subscribe('thisUser', userId);

});



// *****************************************************************************
// Template level Helpers
// *****************************************************************************

// Helpers function for the template --> defines all the helpers needed
// ---------------------------------------------------------------------

Template.profilepage.helpers({

  // userData is the selected User's document
  // **************************************

  userProfile: ()=> {
    var id = FlowRouter.getParam('id');
    return Meteor.users.findOne({_id: id});
  },

  // test to see if this profile is their profilepage
  ownProfile: ()=> {
    var id = FlowRouter.getParam('id');
    return Meteor.userId() == id;
  },

  transaction: ()=> {
    var idS = FlowRouter.getParam('id');
    return Transactions.find({idStudent: idS});
  },
  // balance is the balance on the current user's ethereum account
  // *************************************************************

  // not working
  balance: ()=> {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    var myEthAddr = user.ethereum;
    console.log(myEthAddr);
    return ethGetBalance(myEthAddr);
  },

});

Template.profilepage.events({
  'click button': function(event,template) {
    var idS = FlowRouter.getParam('id');
    var idD = Meteor.userId();
    var a = 0.00001 ;
    var ethD = Meteor.users.findOne({_id: idD}).ethereum;
    var ethS = Meteor.users.findOne({_id: idS}).ethereum;
    var trans = ethSendEtherTransaction(ethD, "jackAccount1", ethS, a);
    console.log(trans);
    var options = {
      type : "DtS",
      idStudent: idS,
      idDonor: idD,
      amount: 1,    //Amount needs to be changed as the schema only allows for it to be an integer
      transactionHash: trans,
    }

  console.log(options);

  if(Transactions.insert(options)) {
    console.log("Transaction Added");
  }
  else {
    // Need error handeling here
  }

/*
// Not sure if a method call is necessary. Insert validates data by default.

  Meteor.call('createTransaction', options, function(error, result) {
    // What happens if methods function returns an error
    // +++++++++++++++++++++++++++++++++++++++++++++++++
    console.log("Entered Method Flag");

    if(error) {
      // display the error on the console log of the website
      console.log("Error Flag");
      console.log(error.reason);
      // Set the lastError variable
      template.lastError.set(error.reason);
    }
    // What happens if methods function works fine
    else {
      // Set the lastError to null
      template.lastError.set(null);
      console.log("transaction done");
      // redirect the user to another page after registration
    //  FlowRouter.go('/??')
    }
  });*/
  },
});
