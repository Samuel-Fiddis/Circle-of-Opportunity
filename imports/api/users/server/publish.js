import { Meteor } from 'meteor/meteor';

// Need to get this private
Meteor.publish('userData', function () {
	return Meteor.users.find({});
});

// Private publication for the data of currently logged in user
Meteor.publish('thisUser', function(userId) {
	return Meteor.users.find({_id: userId});
})
