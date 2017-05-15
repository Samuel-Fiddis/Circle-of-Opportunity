import { Meteor } from 'meteor/meteor';

// All variables to publish are kept in the fields option
Meteor.publish('studentDataOverview', function () {
	return Meteor.users.find(
		{"userType.isStudent": true},
		{fields:
			{'_id': 1,
			'name': 1,
			'age': 1,
			'image': 1,
			'uni_info': 1,
			'ethereum': 1,
			'userType.isStudent': 1,
			'bio': 1}});
});

// publish donordata for overview
Meteor.publish('donorDataOverview', function () {
	return Meteor.users.find(
		{"userType.isDonor": true},
		{fields:
			{'_id': 1,
			'name': 1}
		});
});

// Publication of a limited amount of student info (available to all users)
Meteor.publish('studentData', function () {
	return Meteor.users.find({"userType.isStudent": true},{fields: {'name': 1,'age': 1,'uni_info': 1}});
});

// Publication of a limited amount of donor info (available to all users)
Meteor.publish('donorData', function () {
	return Meteor.users.find({"userType.isDonor": true},{fields: {'name': 1,'age': 1, 'company_info': 1, 'interestStudent': 1}});
});

// Private publication for the data of currently logged in user
Meteor.publish('thisUser', function(userId) {
	return Meteor.users.find({_id: userId});
})

// Publish just one users info depending on their id
Meteor.publish('singleUser', function (id) {

	check(id, String);
	return Meteor.users.find(
		{_id: id},
		{fields:
			{'_id': 1,
			'userType': 1,
			'name': 1,
			'age': 1,
			'bio': 1,
			'image': 1,
			'uni_info': 1,
			'address.city': 1,
			'address.country': 1,
			'number_dInterest': 1,
			'interestedDonors': 1,
			'interestStudent': 1,
			'ethereum': 1,
			'balance': 1,
			'allowance': 1,
		}});
});

// Publish studentdata for university
Meteor.publish('uniStudentData', function () {
	return Meteor.users.find(
		{"userType.isStudent": true},
		{fields:
			{'_id': 1,
			'name': 1,
			'age': 1,
			'address.city': 1,
			'address.country': 1,
			'uni_info.eStatus': 1,
			'uni_info.tuition_eth': 1,
			'emails.address': 1,
			'userType.isStudent': 1}});
});
