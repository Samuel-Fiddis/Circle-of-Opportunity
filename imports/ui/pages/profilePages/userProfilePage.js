import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Transactions } from '/imports/api/transactions/transactions.js';

import './userProfilePage.html';
import '/imports/api/users/helpers.js';
import '/imports/ui/components/liveFeed.js';
import '/imports/ui/components/profileInfo.js';
import '/imports/ui/components/donationInfo.js'
//import '/imports/ui/components/donationInfo.html';
import '/imports/ui/components/registerInterest.js';


Template.userProfilePage.onCreated( function () {

  // Template level subscriptions
  // ****************************

  // Subscribe thisUser publication: returns the entire user document for the currently logged in user
  // Subscribe singleUser publication: returns just public info of single user

  this.lastError = new ReactiveVar(null);
  var self = this;

  self.autorun(function() {

    var id = FlowRouter.getParam('id');
    var userid = Meteor.userId();

    if(id == userid){
      self.subscribe('thisUser', userid);
    }

    else{
      self.subscribe('singleUser', id);
      self.subscribe('singleUser', userid);
    }

  });

});

Template.userProfilePage.events({

  // Event to define what happens when you click the updateInterest button
  // **********************************************************************

  'click .updateinterest': function(event,template) {
    if(event)

    // get the id of the student with this profile page
    var studentId = FlowRouter.getParam('id');

    // call the updateInterest method passing on the studentId
    // =======================================================

    Meteor.call('updateInterest', studentId, function(error, result) {

      if(error) {
        console.log(error.reason);
        template.lastError.set(error.reason);
      }

      else {
        console.log("interest updated");
      };

    });


  },

  'click .createTrans': function(event,template) {
    // get ids of studentand donor
    var idS = FlowRouter.getParam('id');

    var idD = Meteor.userId();

    // read the amount of ethSendEtherTransaction
    // default value: 0.001

    var a =  parseFloat($('input[name=amount]').val()) ;

    // check if the amount is a float. If not throw an error
    if (typeof(a) != "number"){
      throw new Meteor.Error("Wrong amount","Please fill out a real number");
    }

    // query the database to get th epublic key
    // var ethD = Meteor.users.findOne({_id: idD}).ethereum;
    // var ethS = Meteor.users.findOne({_id: idS}).ethereum;

    // query the database to get the nameStudent
    var nS = Meteor.users.findOne({_id: idS}).name;
    var nD = Meteor.user().name;


    // buils the options to store the transaction in the db
    var options = {
      type : "DtS",
      idReceiver: idS,
      nameReceiver: nS.first + " " + nS.last,
      idSender: idD,
      nameSender: nD.first + " " + nD.last,
      amount: a,
      //transactionHash: trans,
    }

    Meteor.call('createTransaction', options, function(error, result) {
      // What happens if methods function returns an error
      // +++++++++++++++++++++++++++++++++++++++++++++++++
      console.log("Entered Method Flag");

      if(error) {
        // display the error on the console log of the website
        console.log("Error Flag");
        console.log(error.reason);
      }
      // What happens if methods function works fine
      else {
        console.log("transaction done");
      }
    });

    console.log("about to enter Target Checking");
    Meteor.call('checkTarget',idS);
  },

  'click .acceptOpportunity': function(event,template) {
    //change User.uniInfo.estatus to acceptedOpportunity

    // get selected value
    var newValue = "acceptedOpportunity";
    //get studentID
    var studentId = FlowRouter.getParam('id');

    Meteor.call('updateStatus', studentId, newValue, function(error, result) {

      // What happens if methods function returns an error
      // +++++++++++++++++++++++++++++++++++++++++++++++++

      if(error) {

        // display the error on the console log of the website
        console.log(error.reason);
      };

    });
  }

});

Template.userProfilePage.helpers({

  // userProfile is the selected User's document
  // **************************************

  userProfile: ()=> {
    var id = FlowRouter.getParam('id');
    return Meteor.users.findOne({_id: id});
  },

  // bool to see if this profile is their profilepage
  // ************************************************
  ownProfile: ()=> {
    var id = FlowRouter.getParam('id');
    return Meteor.userId() == id;
  },

  // checking if profile belongs to a student
  // ****************************************

  student: function () {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    return user.userType.isStudent;
  },

  // checking if profile belongs to former student
  // *********************************************

  formerStudent: function(){
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    return user.userType.isFormerStudent;
  },

  pending: function () {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    return user.uni_info.eStatus == "pending";
  },

  acceptedStudent: function () {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    return user.uni_info.eStatus == "accepted";
  },

  targetReached: function () {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    return user.uni_info.eStatus == "targetReached";
  },

  acceptedOpportunity: function () {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    return user.uni_info.eStatus == "acceptedOpportunity";
  },

  userImage : function (){
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    //Meteor.users.findOne({"emails.address":{$regex:"@coreygarvey.com"}});
    if(typeof user.userImage().currentFile !== "undefined"){
      currentFile = user.userImage().currentFile;
    }
    return currentFile;
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

  statusIs: function(status) {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    return user.uni_info.eStatus == status;
  },
  errorMessage: function () {
    return Template.instance().lastError.get();
  },

});

Template.publicProfileInfo.helpers({
  // bool to see if this profile is their profilepage
  // ************************************************
  ownProfile: ()=> {
    var id = FlowRouter.getParam('id');
    return Meteor.userId() == id;
  },

  // checking if profile belongs to a student
  // ****************************************
  student: function () {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    return user.userType.isStudent;
  },

  acceptedStudent: function () {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    return user.uni_info.eStatus == "accepted";
  },
});
