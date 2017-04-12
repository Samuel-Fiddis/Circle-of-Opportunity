import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Transactions = new Mongo.Collection('transactions');

//export const Universities = new Mongo.Collection('Universities');

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
		type: String,
		label: "amount"
	},
  transactionHash: {
		type: String,
		label: "transactionHash"
	},
});

Transactions.attachSchema( TransactionSchema );
