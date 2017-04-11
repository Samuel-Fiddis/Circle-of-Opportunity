Transactions = new Mongo.Collection('transactions');

TransactionSchema = new SimpleSchema({
	type: {
		type: String,
		label: "Type"
	},
	idStudent: {
		type: String,
		label: "IdStudent"
	},
  idDonor: {
		type: String,
		label: "IdDonor"
	},
  amount: {
		type: String,
		label: "Amount"
	},
  transactionHash: {
		type: String,
		label: "TransactionHash"
	},
});

Transactions.attachSchema( TransactionSchema );
