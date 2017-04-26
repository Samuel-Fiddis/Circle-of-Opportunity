import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './donoroverview.html';

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

/* NOTE: javascript syntax for the functions used

user: ()=> { return Meteor.users.find();}
is equivalent to
user: function() { return Meteor.users.find(); }

*/

Template.donoroverview.helpers({

  // user returns a pointer to all the user documents in subscription
  // ****************************************************************

  user: ()=> {
    var selectionCriteria = Session.get("orderselection");
    var sortOrder = {};
    sortOrder[selectionCriteria] = 1;
    console.log("Database query");
    console.log(selectionCriteria);
    return Meteor.users.find({}, {sort: sortOrder});
  },

  balance : function (){
    var myEthAddr = this.ethereum;
    return ethGetBalance(myEthAddr);
  },

});


Template.orderButton.events({
  'click': function(){
        console.log("You clicked something");
    },
  'change #orderselecter' : function (evt){
    var newValue = $(evt.target).val();
    var oldValue = Session.get("orderselection");
    if (newValue != oldValue){
      //something
    }
    Session.set("orderselection", newValue)
    return true;
  },
});
