import { Meteor } from 'meteor/meteor';
import { Transactions } from './transactions.js';

import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Meteor.methods({

  // Transaction COO Donor to COO Student
  createTransaction: function(options) {

    // Get the donor's and student's public key stored in mongodb
    var ethD = Meteor.users.findOne({_id:  options.idSender}).ethereum;
    var ethS = Meteor.users.findOne({_id:  options.idReceiver}).ethereum;
    //if(ethD == Meteor.settings.ethDonorCoo){
    if(ethD == "0x0b0be3d00a30095b38cb4838b355f83ed6693423"){
      //var pwdSender = Meteor.settings.pwdDonorCoo;
      var pwdSender = "jackAccount1";
    }
    else var pwdSender = "password";

    var trans = ethSendEtherTransaction(ethD, pwdSender, ethS, options.amount);

    //   // insufficient funds
    //   if (trans == false){
    //     throw new Meteor.Error("Insuficient funds","Please send ether on your wallet");
    //   }
    //   else{
    options.transactionHash = trans;

    // Store the transaction in the database
    return Transactions.insert(options);
  },

  // Transaction COO Donor to COO General Pot
  donatenow: function(options){

    // COO's donor public key
    var ethD = Meteor.users.findOne({_id:  options.idSender}).ethereum;
    // Password of the COO's donor
    var pwdSender = Meteor.settings.pwdDonorCoo;
    // General pot's public key
    var keyGeneral = Meteor.settings.general.generalKey;

    // Make the transaction
    var trans = ethSendEtherTransaction(ethD, pwdSender, keyGeneral, options.amount);

    // insufficient funds
    //   if (trans == false){
    //     throw new Meteor.Error("Insuficient funds","Please send ether on your wallet");
    //   }
    //   else{

    // build the object options to store record of the transaction in MongoDB
    options.transactionHash = trans;
    options.idReceiver =  Meteor.settings.general.generalId;
    options.nameReceiver =  Meteor.settings.general.generalName;

    // Store the transaction in the database
    return Transactions.insert(options);
  },

  // If student, return the amount of money received so far
  // If donor, return the amount of donations given so far
  totalDonation: function(options) {

    check(options,String);

    // For someone who isnt a student
    // ******************************

    var user = Meteor.users.findOne({_id: options});

    if(user.userType.isStudent) {

      var transactionPointer = Transactions.find({idReceiver: options});
      totalAmount = 0;

      transactionPointer.forEach(function(transaction) {
        totalAmount = totalAmount + transaction.amount;
      });

    }

    else {

      var transactionPointer = Transactions.find({idSender: options});
      totalAmount = 0;

      transactionPointer.forEach(function(transaction) {
        totalAmount = totalAmount + transaction.amount;
      });

    }

    return totalAmount;
  },

  // Return an array of people that have transactions with this particular person and total amount
  DonatedTo: function(id) {

    check(id,String);

    var user = Meteor.users.findOne({_id: id});

    // If calling this from a student's profile page
    if(user.userType.isStudent) {

      var donor = [];

      var transactionPointer = Transactions.find({idReceiver: id});

      transactionPointer.forEach( function(transaction) {

        var found = donor.find(function(value){
          return value.id == transaction.idSender
        });

        if(found) {
          found.amount = found.amount + transaction.amount;
        }
        else {
          donor.push(
            {
              id: transaction.idSender,
              name: transaction.nameSender,
              amount: transaction.amount,
            }
          )
        }

      });

      return donor;

    }

    // IF not calling this from a student's profile page
    var student = [];

    var transactionPointer = Transactions.find({idSender: id});

    transactionPointer.forEach( function(transaction) {

      var found = student.find( function(value) {
        return value.id == transaction.idReceiver
      });

      if(found) {
        found.amount = found.amount + transaction.amount;
      }
      else {
        student.push(
          {
            id: transaction.idReceiver,
            name: transaction.nameReceiver,
            amount: transaction.amount,
          }
        )
      }

    });

    return student;
  },

  // Returns total amount paid by non-previousStudent users
  totalDonorDonations: function() {

    var transactionPointer = Transactions.find({type: {$in: ["DtG", "DtS"]}});
    totalAmount = 0;

    transactionPointer.forEach(function(transaction) {
      var donor = Meteor.users.findOne({_id: transaction.idSender});
      if("undefined"=== typeof donor.uni_info) {
        totalAmount = totalAmount + transaction.amount;
      }
    });

    return totalAmount*Meteor.settings.ethToPound;
  },

  // Returns total amount paid for tuition and allowance
  totalTuitionAndAllowance: function() {

    var transactionPointer = Transactions.find({type: {$in: ["StU","StC"]}});
    totalAmount = 0;

    transactionPointer.forEach(function(transaction){
      totalAmount = totalAmount + transaction.amount;
    });

    return totalAmount*Meteor.settings.ethToPound;
  },

  // Returns total amount paid back by previous students
  totalPaidBack: function() {

    var transactionPointer = Transactions.find({type: {$in: ["DtG","DtS"]}});
    totalAmount = 0;

    transactionPointer.forEach(function(transaction){
      var donor = Meteor.users.findOne({_id: transaction.idSender});
      if("undefined"!=typeof donor.uni_info && donor.uni_info.eStatus=="graduated") {
        totalAmount = totalAmount + transaction.amount;
      }
    });

    return totalAmount*Meteor.settings.ethToPound;
  }

});
