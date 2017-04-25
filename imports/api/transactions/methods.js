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

  });
