import { Meteor } from 'meteor/meteor';

// All variables to publish are kept in the fields option
Meteor.publish('userData', function () {
	return Meteor.users.find({userType: "student"},{fields: {'_id': 1,'name': 1,'age': 1, 'bio': 1, 'uni_info': 1, 'address.city': 1, 'address.country': 1}});
});

// All variables to publish are kept in the fields option
Meteor.publish('donorData', function () {
	return Meteor.users.find({userType: "donor"},{fields: {'name': 1,'age': 1, 'company_info': 1}});
});

// Private publication for the data of currently logged in user
Meteor.publish('thisUser', function(userId) {
	return Meteor.users.find({_id: userId});
})

// Publish just one users info depending on their id
Meteor.publish('singleUser', function (id) {
	check(id, String);
	return Meteor.users.find({_id: id},{fields: {'_id': 1,'name': 1,'age': 1, 'bio': 1, 'uni_info': 1, 'address.city': 1, 'address.country': 1}});
});
