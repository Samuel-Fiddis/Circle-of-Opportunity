

import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

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
  // balance is the balance on the current user's ethereum account
  // *************************************************************

  // not working
  balance: function() {
    var id = FlowRouter.getParam('id');
    console.log(id);
    var user = Meteor.users.findOne({_id: id});
    console.log(user);
    var myEthAddr = user.ethereum;
    console.log(myEthAddr);
    return ethGetBalance(myEthAddr);
  },

});

Template.profilepage.events({
  'click button'(event) {
    var idS = FlowRouter.getParam('id');
    var idD = Meteor.userId();
    var a = 0.01 ;
    console.log("donate !!");
    var trans = ethSendEtherTransaction(idDonor, idStudent,amount);
    var options = {
      type : "DtS",
      idStudent: idS,
      idDonor: idD,
      amount: a,
      transactionHash: trans,
  }

  Meteor.call('createTransaction', options, function(error, result) {
    // What happens if methods function returns an error
    // +++++++++++++++++++++++++++++++++++++++++++++++++

    if(error) {
      // display the error on the console log of the website
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
  });
  },
});
