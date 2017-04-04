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
  var userId = Meteor.userId();
  this.subscribe('thisUser', userId);

});



// *****************************************************************************
// Template level Helpers
// *****************************************************************************

// Helpers function for the template --> defines all the helpers needed
// ---------------------------------------------------------------------

Template.profilepage.helpers({

  // userData is the currentUser's document
  // **************************************

  userData: function() {
    return Meteor.user();
  },

  // balance is the balance on the current user's ethereum account
  // *************************************************************

  // need to check that the "this" here still works the same way as in studentView
  balance: function() {
    var myEthAddr = this.ethereum;
    return ethGetBalance(myEthAddr);
  },

});
