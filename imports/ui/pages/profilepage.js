import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

/*import { Profiles } from '../api/profiles.js'*/

import './profilepage.html';


Template.profilepage.helpers({
    profileinfo() {
      console.log("hello");

      var user = Meteor.user();
      var email = user && user.emails && user.emails[0].address;
      return email;
      /*return Meteor.users.find({_id:Meteor.userId}, {fields: {emails: 1, profile: 1}});*/
    },
});
