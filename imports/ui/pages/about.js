import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './about.html';

Template.about.onCreated( function() {

  var self = this;

  self.autorun(function() {
    var userid = Meteor.userId();
    self.subscribe('thisUser', userid);
  });

});

Template.about.helpers({

  publicKey: ()=> {
    var userId = Meteor.userId();
    return Meteor.users.findOne({_id: userId});
  },
});