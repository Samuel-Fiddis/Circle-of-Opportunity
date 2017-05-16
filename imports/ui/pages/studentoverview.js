import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './studentoverview.html';
import './studentView.html';
import '/imports/api/users/helpers.js';

// *****************************************************************************
// What happens when you create the template
// *****************************************************************************

// OnCreated function for the template --> is run when page is rendered
// --------------------------------------------------------------------

Template.studentoverview.onCreated( function() {

  // Template level subscriptions
  // ****************************

  // subscribe to userData publication: returns all documents in user accounts
  this.subscribe('studentDataOverview');

  // subscribe to universities publication: returns all documents in Universities
  this.subscribe('universities');

});



// *****************************************************************************
// Template level Helpers
// *****************************************************************************

// Helpers function for the template --> defines all the helpers needed
// ---------------------------------------------------------------------

Template.studentoverview.helpers({

  // user returns a pointer to all the user documents in subscription
  // ****************************************************************

  user: ()=> {
    var selectionCriteria = Session.get("orderselection");
    var sortOrder = {};
    sortOrder[selectionCriteria] = 1;
    console.log("Database query");
    console.log(Meteor.users.find());
    return Meteor.users.find({"userType.isStudent": true}, {sort: sortOrder});

  },

  secondStudent: function (index) {
    return (index + 1) % 2 === 0;
  },

  // uni_name returns the name of the university affiliated with this student
  // ************************************************************************

  /*
  uni_name: function () {
    return Universities.findOne({_id:this.uni_info.uni},{name: 1});
  },
  */

  // studentoverView Helper to pass on ethereum information based on public key
  // --------------------------------------------------------------------------

  balance : function (){
    var myEthAddr = this.ethereum;
    return ethGetBalance(myEthAddr);
  },

  userImage : function (){
    const user = this;
    //Meteor.users.findOne({"emails.address":{$regex:"@coreygarvey.com"}});
    if(typeof user.userImage().currentFile !== "undefined"){
      console.log(user.userImage().currentFile);
      currentFile = user.userImage().currentFile;
    }
    return currentFile;
  }

});


Template.studentView.helpers({

  progressPerc: function(){
    var id = this._id;
    var user = Meteor.users.findOne({_id: id});
    max = user.uni_info.tuition_eth + user.uni_info.allowance_eth * 10;
    // Should be calling balance from Ethereuem
    // current = ReactiveMethod.call('totalDonation',id);
    current = ethGetBalance(user.ethereum);
    percentRaised = Math.round((current/max)*100,2);
    return percentRaised;
  },

  pending: function () {
    var id = this._id;
    var user = Meteor.users.findOne({_id: id});
    return user.uni_info.eStatus == "pending";
  },

  accepted: function () {
    var id = this._id;
    var user = Meteor.users.findOne({_id: id});
    console.log("accepted");
    console.log(user);
    return user.uni_info.eStatus == "accepted";
  },

  rejected: function () {
    var id = this._id;
    var user = Meteor.users.findOne({_id: id});
    return user.uni_info.eStatus == "rejected";
  },

});


Template.orderButton.events({
  'click': function(){
        console.log("You clicked something");
    },
  'change #orderselecter' : function (evt){
    var newValue = $(evt.target).val();
    // console.log("newValue");
    // console.log(newValue);
    var oldValue = Session.get("orderselection");
    // console.log("oldValue");
    // console.log(oldValue);
    if (newValue != oldValue){
      //something
    }
    Session.set("orderselection", newValue)
    // console.log("done");
    return true;
  },
});
