import { Meteor } from 'meteor/meteor';
import { Transactions } from './transactions.js';


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

     return Transactions.insert({'type': options.type, 'idStudent': options.idStudent, 'idDonor': options.idDonor, 'amount': options.amount, 'transactionHash': options.transactionHash});

 },

 });
