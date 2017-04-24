import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Transactions } from '/imports/api/transactions/transactions.js';

import './liveFeed.html'

Template.livefeed.onCreated( function() {

  // Template level subscriptions
  // ****************************

  // Subscribe transhations publication: returns all transactions
  var self = this;
  self.autorun(function() {
    self.subscribe('topTransactions', 5);
  });

});

Template.livefeed.helpers({
  transaction: ()=> {
    return Transactions.find({});
  }
});
