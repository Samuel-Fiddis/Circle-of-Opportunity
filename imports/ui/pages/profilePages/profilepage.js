import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Transactions } from '/imports/api/transactions/transactions.js';

import './profilepage.html';
import './userProfilePage.js';
import './uniProfilePage.js';



// *****************************************************************************
// Template level Helpers
// *****************************************************************************

// Helpers function for the template --> defines all the helpers needed
// ---------------------------------------------------------------------

Template.profilepage.helpers({

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


})
