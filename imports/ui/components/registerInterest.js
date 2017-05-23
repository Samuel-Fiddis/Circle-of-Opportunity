import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './registerInterest.html';

Template.studentProfileRegisterInterest.onCreated(function(){

  // Subscribe to limited donor data to get the name and all that of donors
  this.subscribe('donorData');

});
Template.registerInterestButton.helpers({
  ihaveRegisteredInterest: function() {
    console.log("ok");
    var id = Meteor.userId();
    var studentId = FlowRouter.getParam('id');
    console.log(id.name);
    console.log(studentId);
    var matchingDoc = Meteor.users.find({_id: id, interestStudent: studentId}).count();
    console.log(matchingDoc);
    if(matchingDoc == 0) {
      return false;
    }
    return true;
  },

});
Template.studentProfileRegisterInterest.helpers({
  // getting the donor's information on a student profile
  // ****************************************************
  donorInfo: function(index) {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    var donorId = user.interestedDonors[index];
    return Meteor.users.findOne({_id: donorId});
  },
  // boolean to see if the loggedIn user has registered interest in this student before
  // **********************************************************************************

  hasRegisteredInterest: function() {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    if(user.interestedDonors.length>0) {
      return true;
    }
    return false;
  }

});

Template.donorProfileRegisterInterest.onCreated(function(){
  // subscribe to limited student data to get the name and all that of students
  this.subscribe('studentData');
})

Template.donorProfileRegisterInterest.helpers({
  // getting the student's information on a donor profile
  // ****************************************************
  studentInfo: function(index) {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    var studentId = user.interestStudent[index];
    return Meteor.users.findOne({_id: studentId});
  },
  isStatus: function(status) {
    return this.uni_info.eStatus == status;
  },
});

Template.registerInterestButton.helpers({
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
})
