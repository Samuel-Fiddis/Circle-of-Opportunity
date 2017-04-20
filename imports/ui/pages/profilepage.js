import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './profilepage.html';
import './studentViewUni.html';
import '/imports/api/users/helpers.js';
//import './orderButton.html';  <<<<<<<<<< BREAKS HERE!!! DUNNO WHY

// *****************************************************************************
// What happens when you create the template
// *****************************************************************************

// OnCreated function for the template --> is run when page is rendered
// --------------------------------------------------------------------

Template.profilepage.onCreated( function() {

  // Template level subscriptions
  // ****************************

  // Subscribe thisUser publication: returns the entire user document for the currently logged in user
  // Subscribe singleUser publication: returns just public info of single user
  // Subscribe uniData returns data of all students -> relevant for university after login page
  var self = this;

  self.autorun(function() {

    var id = FlowRouter.getParam('id');
    var userid = Meteor.userId();

    // subscribe to personal profile info

    if(id == userid){
      self.subscribe('thisUser', userid);
      if (Meteor.users.findOne({"emails.address":"uni@uni.uni"})){
        self.subscribe('uniData');
      }
    }

    else{
      self.subscribe('singleUser', id);
    }

    // NOTE: Not sure how to selectively subscribe to donorData or studentData depending on userType


    // Subscribe to limited donor data to get the name and all that of donors
    self.subscribe('donorData');

    // subscribe to limited student data to get the name and all that of students
    self.subscribe('studentData');



  });

});

// *****************************************************************************
// Events allocated to Profile Page
// *****************************************************************************

// Events function for the Profile Page: defines all events allocated to form
// -----------------------------------------------------------------------------

Template.profilepage.events({

  // Event to define what happens when you submit the register form
  // **************************************************************

  'click button': function(event,template) {

    // get the id of the student with this profile page
    var studentId = FlowRouter.getParam('id');



    // call the updateInterest method passing on the studentId
    // =======================================================

    /*
    NOTE: You should avoid passing userId's to meteor methods (because then anyone can update that field)
    so this needs to be improved
    */

    Meteor.call('updateInterest', studentId, function(error, result) {

      // What happens if methods function returns an error
      // +++++++++++++++++++++++++++++++++++++++++++++++++

      if(error) {

        // display the error on the console log of the website
        console.log(error.reason);

        // Set the lastError variable
        /*
        template.lastError.set(error.reason);
        */

      }

      // What happens if methods function works fine
      // ++++++++++++++++++++++++++++++++++++++++++++

      else {

        // Set the lastError to null
        /*
        template.lastError.set(null);
        */

        // redirect the user to another page
        FlowRouter.go('/')
      };

    });

  }

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
  // nope it doesnt -- need to fix this
  balance: function() {
    var myEthAddr = this.ethereum;
    return ethGetBalance(myEthAddr);
  },

  // checking if profile belongs to a student
  // ****************************************

  student: function () {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    return user.userType.isStudent;
  },

  // getting the donor's information on a student profile
  // ****************************************************

  donorInfo: function(index) {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    var donorId = user.interestedDonors[index];
    return Meteor.users.findOne({_id: donorId});
  },

  // getting the student's information on a donor profile
  // ****************************************************

  studentInfo: function(index) {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    var studentId = user.interestStudent[index];
    return Meteor.users.findOne({_id: studentId});
  },

  // boolean to see if the loggedIn user has registered interest in this student before
  // **********************************************************************************

  hasRegisteredInterest: function() {
    var id = Meteor.userId();
    var studentId = FlowRouter.getParam('id');
    var matchingDoc = Meteor.users.find({_id: id, interestStudent: studentId}).count();
    if(matchingDoc == 0) {
      return false;
    }
    return true;
  },


  donorImage : function (){
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    //Meteor.users.findOne({"emails.address":{$regex:"@coreygarvey.com"}});
    if(typeof user.userImage().currentFile !== "undefined"){
      currentFile = user.userImage().currentFile;
    }
    return currentFile;
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
    console.log("done selecting order");
    return true;
  },
});

Template.statusButton.events({
  'click': function(){
        console.log("You clicked something");
    },

  'change #statusselecter' : function (evt){
    // get selected value
    var newValue = $(evt.target).val();
    //get studentID
    var updateUser = this._id;

    Meteor.call('updateStatus', updateUser, newValue, function(error, result) {

      // What happens if methods function returns an error
      // +++++++++++++++++++++++++++++++++++++++++++++++++

      if(error) {

        // display the error on the console log of the website
        console.log(error.reason);

        // Set the lastError variable
        /*
        template.lastError.set(error.reason);
        */

      };

    });

  },
});
