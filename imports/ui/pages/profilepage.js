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
  // Subscribe singleUser pub: returns just public info of single user
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    var userid = Meteor.userId();
    if(id == userid){
      self.subscribe('thisUser', userid);
    }
    else{
      self.subscribe('singleUser', id);
    }
  });

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

  // need to check that the "this" here still works the same way as in studentView
  // nope it doesnt -- need to fix this 
  balance: function() {
    var myEthAddr = this.ethereum;
    return ethGetBalance(myEthAddr);
  },

});
