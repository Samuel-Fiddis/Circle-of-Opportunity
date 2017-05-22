import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import '../components/navBar.js';
import '../components/footBar.js';

import './mainpage.html';

Template.mainpage.onCreated( function () {

  var self = this;
  self.autorun(function() {
    var userid = Meteor.userId();
    self.subscribe('singleUser', userid);
  });

});


Template.mainpage.helpers({
  student: function(){
    var id = Meteor.userId();
    var user = Meteor.users.findOne({_id: id});
    return user.userType.isStudent;
  },
  donor: function(){
    var id = Meteor.userId();
    var user = Meteor.users.findOne({_id: id});
    return user.userType.isDonor;
  },
  uni: function(){
    var id = Meteor.userId();
    var user = Meteor.users.findOne({_id: id});
    return user.userType.isUniAdmin;
  },
});
