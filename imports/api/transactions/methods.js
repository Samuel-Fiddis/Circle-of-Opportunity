import { Meteor } from 'meteor/meteor';
import { Transactions } from './transactions.js';
 Meteor.methods({

   createTransaction: function(options) {

     var userId;

     check(options,
       {
         // All users will have the following upon registration
         type: String,
         idStudent: String,
         idDonor: String,
        // amount: String,
         transaction: String,
       });

     Transactions.insert({'type': options.type, 'idStudent': options.idStudent, 'idDonor': options.idDonor, 'amount': options.amount, 'transactionHash': options.transaction});

 },

 });
