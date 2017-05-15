import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Universities } from '/imports/api/universities/universities.js'

import './uniProfilePage.html';
import './studentViewUni.html';
import '/imports/ui/components/profileInfo.html';


Template.uniProfilePage.onCreated( function() {

  var self = this;

  self.autorun( function() {

    var id = FlowRouter.getParam('id');
    var userid = Meteor.userId();

    // subscribe to personal profile info

    if(id == userid) {

      self.subscribe('thisUser', userid);

      if ( Meteor.users.findOne({"emails.address":"uni@uni.uni"}) ) {
        // console.log("subscribing to uniData here")
        self.subscribe('uniStudentData');
      }

      self.subscribe('uniCollectionData', userid);

    }
  });
});


Template.uniProfilePage.helpers({

  // userData is the selected User's document
  // **************************************

  userProfile: ()=> {
    var id = FlowRouter.getParam('id');
    return Meteor.users.findOne({_id: id});
  },

  uniProfile: ()=> {
    var id = FlowRouter.getParam('id');
    var admin = Meteor.users.findOne({_id: id});
    var uniId = admin.adminFor;
    return Universities.findOne({_id: uniId});
  },


});

Template.studentViewUni.helpers({

  // user returns a pointer to all the user documents in subscription
  // ****************************************************************

  user: ()=> {
    var selectionCriteria = Session.get("orderselection");
    var sortOrder = {};
    sortOrder[selectionCriteria] = 1;
    // console.log("Database query");
    // console.log(selectionCriteria);
    return Meteor.users.find({}, {sort: sortOrder});
  },
  student: function () {
    var user = Meteor.users.findOne({_id: this._id});
    console.log("student");
    console.log(user);
    return user.userType.isStudent;
  },
  userImage : function (){
    const user = this;
    //Meteor.users.findOne({"emails.address":{$regex:"@coreygarvey.com"}});
    if(typeof user.userImage().currentFile !== "undefined"){
      console.log(user.userImage().currentFile);
      currentFile = user.userImage().currentFile;
    }
    console.log("userImage");
    console.log(user.userImage());
    console.log("userImage.currentFile");
    console.log(user.userImage().currentFile);
    return currentFile;
  }

  // uni_name returns the name of the university affiliated with this student
  // ************************************************************************

  /*
  uni_name: function () {
  return Universities.findOne({_id:this.uni_info.uni},{name: 1});
  },*/

});

Template.studentViewUniHelper.helpers({
  balance : function (){
    var myEthAddr = this.ethereum;
    return ethGetBalance(myEthAddr);
  },
  acceptedOpportunity: function () {
    var user = Meteor.users.findOne({_id: this._id});
    console.log("HERE!!!");
    console.log(user);
    return user.uni_info.eStatus == "acceptedOpportunity";
  },
  
});

Template.orderButton.events({
  'click': function(){
    console.log("You clicked something");
  },
  'change #orderselecter' : function (evt){
    var newValue = $(evt.target).val();
    console.log("newValue");
    console.log(newValue);
    var oldValue = Session.get("orderselection");
    console.log("oldValue");
    console.log(oldValue);
    if (newValue != oldValue){
      //something
    }
    Session.set("orderselection", newValue)
    console.log("done selecting order");
    return true;
  },
});

Template.statusButton.events({
  'click': function(){
    console.log("You clicked something");
  },

  'change #statusselecter' : function (evt){
    // get selected value
    var newValue = $(evt.target).val();
    //get studentID
    var updateUser = this._id;

    Meteor.call('updateStatus', updateUser, newValue, function(error, result) {

      // What happens if methods function returns an error
      // +++++++++++++++++++++++++++++++++++++++++++++++++

      if(error) {

        // display the error on the console log of the website
        console.log(error.reason);

        // Set the lastError variable
        /*
        template.lastError.set(error.reason);
        */

      };

    });

  },
});

Template.acceptTuitionButton.events({
  'click .acceptTuition' : function (evt){
    //FIRST PAY THE UNIVERSITY
    // New Transaction
    console.log("Clicked accept Tuition Button");
    var idS = this._id;
    var idU = Meteor.userId();
    console.log(idU);
    // read the amount of ethSendEtherTransaction

    var a = this.uni_info.tuition_eth;
    console.log(a);
    // check if the amount is a float. If not throw an error
    if (typeof(a) != "number"){
      throw new Meteor.Error("Wrong amount","Please fill out a real number");
    }

    // query the database to get th epublic key
    // var ethD = Meteor.users.findOne({_id: idD}).ethereum;
    // var ethS = Meteor.users.findOne({_id: idS}).ethereum;

    // query the database to get the nameStudent
    var nS = this.name;
    var nU = Meteor.user().name;

    // Create the transaction options to preform the transaction
      var options = {
        type : "StU",
        idReceiver: idU,
        nameReceiver: nU.first + " " + nU.last,
        idSender: idS,
        nameSender: nS.first + " " + nS.last,
        amount: a,
      }

    // Send ether to the uni and create a local transaction record
      Meteor.call('createTransaction', options, function(error, result) {
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

    // get selected value
    var newValue = "universityPaid";
    //get studentID

    Meteor.call('updateStatus', idS, newValue, function(error, result) {

      // What happens if methods function returns an error
      // +++++++++++++++++++++++++++++++++++++++++++++++++

      if(error) {

        // display the error on the console log of the website
        console.log(error.reason);

        // Set the lastError variable
        /*
        template.lastError.set(error.reason);
        */

      };

    });

  }

});
