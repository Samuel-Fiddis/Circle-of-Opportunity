import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './donatenow.html';

import '/imports/ui/components/liveFeed.js';

Template.donatenow.onCreated( function() {

  var self = this;

  self.autorun(function() {
    var userid = Meteor.userId();
    // subscribe to personal profile info
    self.subscribe('singleUser', userid);
  });
});


Template.donatenow.events({

  'click .donatenow': function(event,template) {

    var idD = Meteor.userId();
    var nD = Meteor.user().name;

    // read the amount of ethSendEtherTransaction
    // default value: 0.001

    var a =  parseFloat($('input[name=amount]').val()) ;

    // check if the amount is a float. If not throw an error
    if (typeof(a) != "number"){
      throw new Meteor.Error("Wrong amount","Please fill out a real number");
    }

    var options = {
      type : "DtG",
      idSender: idD,
      nameSender: nD.first + " " + nD.last,
      amount: a,
      //transactionHash: trans,
    }

    Meteor.call('donatenow', options, function(error, result) {
      // What happens if methods function returns an error
      // +++++++++++++++++++++++++++++++++++++++++++++++++
      console.log("Entered Method Flag");

      if(error) {
        // display the error on the console log of the website
        console.log("Error Flag");
        console.log(error.reason);
      }
      // What happens if methods function works fine
      else {
        // Set the lastError to null
        //template.lastError.set(null);
        console.log("transaction done");
        // redirect the user to another page after registration
        //  FlowRouter.go('/??')
      }
    });
  }

});
