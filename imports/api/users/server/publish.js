import { Meteor } from 'meteor/meteor';

// All variables to publish are kept in the fields option
Meteor.publish('userData', function () {
	return Meteor.users.find({userType: "student"},{fields: {'name': 1,'age': 1, 'uni_info': 1}});
});

// All variables to publish are kept in the fields option
Meteor.publish('donorData', function () {
	return Meteor.users.find({userType: "donor"},{fields: {'name': 1,'age': 1, 'company_info': 1}});
});

// Private publication for the data of currently logged in user
Meteor.publish('thisUser', function(userId) {
	return Meteor.users.find({_id: userId});
})
