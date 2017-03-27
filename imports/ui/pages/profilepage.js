import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

/*import { Profiles } from '../api/profiles.js'*/

import './profilepage.html';


// Template level subscription
// ---------------------------

Template.profilepage.onCreated( function() {

  console.log("created");

  // Subscribe to the entire user document about the currently logged in user
  var userId = Meteor.userId();
  this.subscribe('thisUser', userId);

});


// Template level helpers
// ----------------------

Template.profilepage.helpers({

    profileinfo: function() {

      var user = Meteor.user();
      var email = user.emails[0].address;


      /*
      var profile = {
        var email = user.emails[0].address;
        var age = user.age;
      }
      */

      return email;

    },
});
