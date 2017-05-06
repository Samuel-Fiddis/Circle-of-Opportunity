import { Meteor } from 'meteor/meteor';
import { Transactions } from './transactions.js';

import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

//I'm not sure this is necessary.
//Using insert already validates against the schema by default.
Meteor.methods({

  createTransaction: function(options) {

    //     Transactions.schema.validate(options);

    //     check(options,
    //       {
    //         // All users will have the following upon registration
    //         type: String,
    //         idStudent: String,
    //         idDonor: String,
    //         amount: Number,
    //         transaction: String,
    //       });

    var ethD = Meteor.users.findOne({_id:  options.idDonor}).ethereum;
    var ethS = Meteor.users.findOne({_id:  options.idStudent}).ethereum;

    var trans = ethSendEtherTransaction(ethD, "jackAccount1", ethS, options.amount);

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

  donatenow: function(options){

    var ethD = Meteor.users.findOne({_id:  options.idDonor}).ethereum;

    var trans = ethSendEtherTransaction(ethD, "jackAccount1", "0xc08ee9c6252fb61271520dacac9a6126255bc81e", options.amount);

    // web3.personal.unlockAccount("general", "0xc08ee9c6252fb61271520dacac9a6126255bc81e")
    // insufficient funds
    //   if (trans == false){
    //     throw new Meteor.Error("Insuficient funds","Please send ether on your wallet");
    //   }
    //   else{
    options.transactionHash = trans;
    options.idStudent = "general";
    options.nameStudent = "the general pot";

    return Transactions.insert(options);
  },

  totalDonation: function(options) {

    check(options,String);

    // For someone who isnt a student
    // ******************************

    var user = Meteor.users.findOne({_id: options});

    if(user.userType.isStudent) {

      var transactionPointer = Transactions.find({idStudent: options});
      totalAmount = 0;

      transactionPointer.forEach(function(transaction) {
        totalAmount = totalAmount + transaction.amount;
      });

    }

    else {

      var transactionPointer = Transactions.find({idDonor: options});
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

      var transactionPointer = Transactions.find({idStudent: id});

      transactionPointer.forEach( function(transaction) {

        if(transaction.idStudent != "general") {

          var found = donor.find(function(value){
            return value.id == transaction.idDonor
          });

          if(found) {
            found.amount = found.amount + transaction.amount;
          }
          else {
            donor.push(
              {
                id: transaction.idDonor,
                name: transaction.nameDonor,
                amount: transaction.amount,
              }
            )
          }

        };

      });

      return donor;

    }

    // IF not calling this from a student's profile page
    var student = [];

    var transactionPointer = Transactions.find({idDonor: id});

    transactionPointer.forEach( function(transaction) {

      if(transaction.idStudent != "general") {

        var found = student.find( function(value) {
          return value.id == transaction.idStudent
        });

        if(found) {
          found.amount = found.amount + transaction.amount;
        }
        else {
          student.push(
            {
              id: transaction.idStudent,
              name: transaction.nameStudent,
              amount: transaction.amount,
            }
          )
        }

      };

    });

    return student;
  },
});
