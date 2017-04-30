import { Meteor } from 'meteor/meteor';
import { Transactions } from './transactions.js';

import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

//I'm not sure this is necessary.
//Using insert already validates against the schema by default.
Meteor.methods({

  createTransaction: function(options) {

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

  studentEnoughMoney: function(options){
    var ethS = Meteor.users.findOne({_id:  options.idStudent}).ethereum;
    var money = Meteor.users.findOne({_id:  options.idStudent}).money;
    console.log(ethGetBalance(ethS));
    console.log(money);
    money =0.1;

    if(ethGetBalance(ethS)>money){
      console.log("enough money");
      // var op = {
      //   type : "StS",
      //   idStudent: idS,
      //   nameStudent: nS.first + " " + nS.last,
      //   idDonor: idD,
      //   nameDonor: nD.first + " " + nD.last,
      //   amount: money
      // }
    }

  },
});
