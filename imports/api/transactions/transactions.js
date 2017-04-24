import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import faker from 'faker';

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
  nameStudent: {
    type: String,
    label: "nameStudent",
  },
  idDonor: {
		type: String,
		label: "idDonor"
	},
  nameDonor: {
    type: String,
    label: "nameDonor",
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
  createdAt: {
    type: Date,
    label: "createdAt",
    autoValue: function() {
      return new Date()
    }

  }
});

Transactions.attachSchema( TransactionSchema );

Factory.define('transaction', Transactions, {
	type: () => faker.lorem.sentence(),
	idStudent: () => faker.lorem.sentence(),
  idDonor: () => faker.lorem.sentence(),
  amount: 0.01,
  transactionHash: () => faker.lorem.sentence(),
  createdAt: () => faker.lorem.date(),
});
