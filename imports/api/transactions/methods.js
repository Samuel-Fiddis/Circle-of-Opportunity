import { Meteor } from 'meteor/meteor';
import { Transactions } from './transactions.js';

import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

//I'm not sure this is necessary.
//Using insert already validates against the schema by default.
Meteor.methods({

  // Transaction COO Donor to COO Student
  createTransaction: function(options) {

    // get the donor's and student's public key
    var ethD = Meteor.users.findOne({_id:  options.idSender}).ethereum;
    var ethS = Meteor.users.findOne({_id:  options.idReceiver}).ethereum;
    var pwdSender = Meteor.settings.pwdDonorCoo;
    var trans = ethSendEtherTransaction(ethD, pwdSender, ethS, options.amount);

    //   // insufficient funds
    //   if (trans == false){
    //     throw new Meteor.Error("Insuficient funds","Please send ether on your wallet");
    //   }
    //   else{
    options.transactionHash = trans;

    return Transactions.insert(options);
    //  }
    //return Transactions.insert(options);
    //{'type': options.type, 'idStudent': options.idStudent, 'idDonor': options.idDonor, 'amount': options.amount, 'transactionHash': options.transactionHash}
  },


  // Transaction COO Donor to COO General Pot
  donatenow: function(options){

    var ethD = Meteor.users.findOne({_id:  options.idSender}).ethereum;
    var pwdSender = Meteor.settings.pwdDonorCoo;
    var keyGeneral = Meteor.settings.general.generalKey;

    var trans = ethSendEtherTransaction(ethD, pwdSender, keyGeneral, options.amount);
    // web3.personal.unlockAccount("general", "0xc08ee9c6252fb61271520dacac9a6126255bc81e")
    // insufficient funds
    //   if (trans == false){
    //     throw new Meteor.Error("Insuficient funds","Please send ether on your wallet");
    //   }
    //   else{
    options.transactionHash = trans;
    options.idReceiver =  Meteor.settings.general.generalId;
    options.nameReceiver =  Meteor.settings.general.generalName;

    return Transactions.insert(options);
  },

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

  DonatedTo: function(id) {

    check(id,String);

    var user = Meteor.users.findOne({_id: id});

    // IF calling this from a student's profile page
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

});
