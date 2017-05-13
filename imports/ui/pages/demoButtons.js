import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './demoButtons.html';

Template.demobuttons.events({

  'click .general_pot_allocation': function(event,template) {
    Meteor.call('reallocate');
  },
  'click .smart_contract_creation': function(event,template) {
    Meteor.call('create_contracts');
  }

});
