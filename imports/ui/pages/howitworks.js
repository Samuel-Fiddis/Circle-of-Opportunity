import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './howitworks.html';

Template.howitworks.onCreated( function() {

  var self = this;

  self.autorun(function() {
    var userid = Meteor.userId();
    self.subscribe('thisUser', userid);
  });

});

Template.howitworks.helpers({

  publicKey: ()=> {
    var userId = Meteor.userId();
    return Meteor.users.findOne({_id: userId});
  },
});
