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
  }

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
