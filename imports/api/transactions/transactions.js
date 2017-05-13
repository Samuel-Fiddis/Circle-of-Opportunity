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
	idReceiver: {
		type: String,
		label: "idReceiver"
	},
  nameReceiver: {
    type: String,
    label: "nameReceiver",
  },
  idSender: {
		type: String,
		label: "idSender"
	},
  nameSender: {
    type: String,
    label: "nameSender",
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
	idReceiver: () => faker.lorem.sentence(),
  idSender: () => faker.lorem.sentence(),
  amount: 0.01,
  transactionHash: () => faker.lorem.sentence(),
  createdAt: () => faker.lorem.date(),
});
