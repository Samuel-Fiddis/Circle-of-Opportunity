import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { Universities } from '../../api/universities/universities.js';

import './homepage.html';

Template.homepage.onCreated( function() {

  // Template level subscriptions
  // ****************************

  // subscribe to userData publication: returns all documents in user accounts
  this.subscribe('universities');


  /*
  NOTE: improvements that can be made
  1. Use following format:

  this.autorun(function() {
    this.subscribe('userData');
  });

  this.subscribe() attaches subscriptionReady() (whereas Meteor.subscribe() doesnt)
  this.autorun automatically re-initializes the subscription if something changes
  */

});
