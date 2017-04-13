import { Transactions } from '/imports/api/transactions/transactions.js';

// All variables to publish are kept in the fields option
Meteor.publish('transactions', function () {
	return Transactions.find({type: "DtS"});
});
