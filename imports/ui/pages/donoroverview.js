import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './donoroverview.html';
import '/imports/api/users/helpers.js';

// *****************************************************************************
// What happens when you create the template
// *****************************************************************************

// OnCreated function for the template --> is run when page is rendered
// --------------------------------------------------------------------

Template.donoroverview.onCreated( function() {
  // Template level subscriptions
  // ****************************

  // subscribe to userData publication: returns all documents in user accounts
  this.subscribe('donorDataOverview');
});

// *****************************************************************************
// Template level Helpers
// *****************************************************************************

// Helpers function for the template --> defines all the helpers needed
// ---------------------------------------------------------------------

Template.donoroverview.helpers({

  // user returns a pointer to all the user documents in subscription
  // ****************************************************************

  user: ()=> {
    var selectionCriteria = Session.get("orderselection");
    var sortOrder = {};
    sortOrder[selectionCriteria] = 1;
    console.log("Database query");
    console.log(selectionCriteria);
    console.log(Meteor.users.find({}, {sort: sortOrder}));
    return Meteor.users.find({}, {sort: sortOrder});
  },

  balance : function (){
    var myEthAddr = this.ethereum;
    return ethGetBalance(myEthAddr);
  },


});

Template.donorView.helpers({

  userImage : function (){
    const user = this;
    if(typeof user.userImage().currentFile !== "undefined"){
      console.log(user.userImage().currentFile);
      var currentFile = user.userImage().currentFile;
    }
    return currentFile;
  },


});
