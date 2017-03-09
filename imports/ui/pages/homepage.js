import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './homepage.html';

// Playing around with subscriptions - to be deleted
// *************************************************

Template.homepage.onCreated( function() {
  this.subscribe('universities');
})
