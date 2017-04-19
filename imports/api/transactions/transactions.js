import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Transactions = new Mongo.Collection('transactions');

Transactions.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});

TransactionSchema = new SimpleSchema({
	type: {
		type: String,
		label: "type"
	},
	idStudent: {
		type: String,
		label: "idStudent"
	},
  idDonor: {
		type: String,
		label: "idDonor"
	},
  amount: {
		type: Number,
    decimal: true,
		label: "amount"
	},
  transactionHash: {
		type: String,
		label: "transactionHash"
	},
});

Transactions.attachSchema( TransactionSchema );
