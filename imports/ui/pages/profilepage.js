import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Transactions } from '/imports/api/transactions/transactions.js';


import './profilepage.html';

// *****************************************************************************
// What happens when you create the template
// *****************************************************************************

// OnCreated function for the template --> is run when page is rendered
// --------------------------------------------------------------------

Template.profilepage.onCreated( function() {

  // Template level subscriptions
  // ****************************

  // Subscribe thisUser publication: returns the entire user document for the currently logged in user
<<<<<<< HEAD
  // Subscribe singleUser publication: returns just public info of single user
=======
>>>>>>> newEthTrans
  var self = this;

  self.autorun(function() {

    var id = FlowRouter.getParam('id');
<<<<<<< HEAD
    var userid = Meteor.userId();

    // subscribe to personal profile info

    if(id == userid){
      self.subscribe('thisUser', userid);
    }

    else{
      self.subscribe('singleUser', id);
    }

    // NOTE: Not sure how to selectively subscribe to donorData or studentData depending on userType


    // Subscribe to limited donor data to get the name and all that of donors
    self.subscribe('donorData');

    // subscribe to limited student data to get the name and all that of students
    self.subscribe('studentData');



=======
    self.subscribe('singleUser', id);

    var idD = Meteor.userId();
    self.subscribe('thisUser', idD);
    self.subscribe('transactions');
>>>>>>> newEthTrans
  });
  //var userId = Meteor.userId();
  //this.subscribe('thisUser', userId);

});

<<<<<<< HEAD
// *****************************************************************************
// Events allocated to Profile Page
// *****************************************************************************

// Events function for the Profile Page: defines all events allocated to form
// -----------------------------------------------------------------------------

Template.profilepage.events({

  // Event to define what happens when you submit the register form
  // **************************************************************

  'click button': function(event,template) {

    // get the id of the student with this profile page
    var studentId = FlowRouter.getParam('id');



    // call the updateInterest method passing on the studentId
    // =======================================================

    /*
    NOTE: You should avoid passing userId's to meteor methods (because then anyone can update that field)
    so this needs to be improved
    */

    Meteor.call('updateInterest', studentId, function(error, result) {

      // What happens if methods function returns an error
      // +++++++++++++++++++++++++++++++++++++++++++++++++

      if(error) {

        // display the error on the console log of the website
        console.log(error.reason);

        // Set the lastError variable
        /*
        template.lastError.set(error.reason);
        */

      }

      // What happens if methods function works fine
      // ++++++++++++++++++++++++++++++++++++++++++++

      else {

        // Set the lastError to null
        /*
        template.lastError.set(null);
        */

        // redirect the user to another page
        FlowRouter.go('/')
      };

    });

  }

});


=======
>>>>>>> newEthTrans
// *****************************************************************************
// Template level Helpers
// *****************************************************************************

// Helpers function for the template --> defines all the helpers needed
// ---------------------------------------------------------------------

Template.profilepage.helpers({

  // userData is the selected User's document
  // **************************************

  userProfile: ()=> {
    var id = FlowRouter.getParam('id');
    return Meteor.users.findOne({_id: id});
  },

  // test to see if this profile is their profilepage
  ownProfile: ()=> {
    var id = FlowRouter.getParam('id');
    return Meteor.userId() == id;
  },

  transaction: ()=> {
    var idS = FlowRouter.getParam('id');
    return Transactions.find({idStudent: idS});
  },
  // balance is the balance on the current user's ethereum account
  // *************************************************************


  // not working
  balance: ()=> {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    var myEthAddr = user.ethereum;
    return ethGetBalance(myEthAddr);
  },

  // checking if profile belongs to a student
  // ****************************************

  student: function () {

    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    return user.userType.isStudent;
  },

  // getting the donor's information on a student profile
  // ****************************************************

  donorInfo: function(index) {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    var donorId = user.interestedDonors[index];
    return Meteor.users.findOne({_id: donorId});
  },

  // getting the student's information on a donor profile
  // ****************************************************

  studentInfo: function(index) {
    var id = FlowRouter.getParam('id');
    var user = Meteor.users.findOne({_id: id});
    var studentId = user.interestStudent[index];
    return Meteor.users.findOne({_id: studentId});
  },

  // boolean to see if the loggedIn user has registered interest in this student before
  // **********************************************************************************

  hasRegisteredInterest: function() {
    var id = Meteor.userId();
    var studentId = FlowRouter.getParam('id');
    var matchingDoc = Meteor.users.find({_id: id, interestStudent: studentId}).count();
    if(matchingDoc == 0) {
      return false;
    }
    return true;
  },



});

Template.profilepage.events({
  //button donate
  'click button': function(event,template) {
    // get ids of studentand donor
    var idS = FlowRouter.getParam('id');
    var idD = Meteor.userId();

    // read the amount of ethSendEtherTransaction
    //default value :0.001

    var a =  parseFloat($('input[name=amount]').val()) ;

    // check if the amount is a float. If not throw an error
    if (typeof(a) != "number"){
        throw new Meteor.Error("Wrong amount","Please fill out a real number");
    }

    // query the database to get th epublic key
    var ethD = Meteor.users.findOne({_id: idD}).ethereum;
    var ethS = Meteor.users.findOne({_id: idS}).ethereum;

    // TODO integrate the first part extern donor's account to COO donor's account

    //second transaction :  COO donor's account to COO student's account

    // call the function to make the transaction
    var trans = ethSendEtherTransaction(ethD, "jackAccount1", ethS, a);

    // insufficient funds
    if (trans == false){
      throw new Meteor.Error("Insuficcient funds","Please send ether on your wallet");
    }

    else{
      // buils the options to store the transaction in the db
      var options = {
        type : "DtS",
        idStudent: idS,
        idDonor: idD,
        amount: a,
        transactionHash: trans,
      }

    //   if(Transactions.insert(options)) {
    //     console.log("Transaction Added");
    //   }
    //   else {
    //   //  Need error handeling here
    //  }

      Meteor.call('createTransaction', options, function(error, result) {
        // What happens if methods function returns an error
        // +++++++++++++++++++++++++++++++++++++++++++++++++
        console.log("Entered Method Flag");

        if(error) {
          // display the error on the console log of the website
          console.log("Error Flag");
          console.log(error.reason);
          // Set the lastError variable
          //template.lastError.set(error.reason);
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
  }
})
