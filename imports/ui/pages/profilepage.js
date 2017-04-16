import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './profilepage.html';
import './studentViewUni.html';
import './orderButton.html';

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
  // Subscribe uniData returns data of all students -> relevant for university after login page

  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    var userid = Meteor.userId();
    if(id == userid){
      self.subscribe('thisUser', userid);
      if (Meteor.users.findOne({"emails.address":"uni@uni.uni"})){
        self.subscribe('uniData');
      }
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

  // check if it is the university user
  uniProfile: ()=> {
    return Meteor.users.findOne({"emails.address":"uni@uni.uni"});
  },

  // check if uniuser is on own profile
  uniOwnProfile: ()=> {
    var id = FlowRouter.getParam('id');
    // return ownProfile && uniProfile
    return (Meteor.userId() == id && Meteor.users.findOne({"emails.address":"uni@uni.uni"}));
  },

  // balance is the balance on the current user's ethereum account
  // *************************************************************

  // need to check that the "this" here still works the same way as in studentView
  balance: function() {
    var myEthAddr = this.ethereum;
    return ethGetBalance(myEthAddr);
  },

});

Template.studentViewUni.helpers({

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

  // uni_name returns the name of the university affiliated with this student
  // ************************************************************************

  /*
  uni_name: function () {
    return Universities.findOne({_id:this.uni_info.uni},{name: 1});
  },
  */

});

Template.studentViewUniHelper.helpers({
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
    console.log("newValue");
    console.log(newValue);
    var oldValue = Session.get("orderselection");
    console.log("oldValue");
    console.log(oldValue);
    if (newValue != oldValue){
      //something
    }
    Session.set("orderselection", newValue)
    console.log("done");
    return true;
  },
});

Template.statusButton.events({
  'click': function(){
        console.log("You clicked something");
    },
  /*'change #orderselecter' : function (evt){
    var newValue = $(evt.target).val();
    console.log("newValue");
    console.log(newValue);
    var oldValue = Session.get("orderselection");
    console.log("oldValue");
    console.log(oldValue);
    if (newValue != oldValue){
      //something
    }
    Session.set("orderselection", newValue)
    console.log("done");
    return true;
  },*/
});
