import { Transactions } from '/imports/api/transactions/transactions.js';

// All variables to publish are kept in the fields option
Meteor.publish('transactions', function () {
	return Transactions.find({type: "DtS"});
});

Meteor.publish('topTransactions', function (nT) {
	return Transactions.find({},{sort: {createdAt: -1}, limit: nT});
});

Meteor.publish('topStudentTransactions', function(id,nT){
	return Transactions.find({idStudent: id},{sort: {createdAt: -1}, limit: nT});
});

Meteor.publish('topDonorTransactions', function(id,nT){
	return Transactions.find({idDonor: id},{sort: {createdAt: -1}, limit: nT});
});

Meteor.publish('thisUserTransactions', function(id) {
	var user = Meteor.users.findOne({_id: id});
	if(user.userType.isStudent){
		return Transactions.find({idStudent: id});
	}
	else {
		return Transactions.find({idDonor: id});
	}
});
