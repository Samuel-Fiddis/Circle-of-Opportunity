import { Meteor } from 'meteor/meteor';

// Need to get this private
Meteor.publish('userData', function () {
	return Meteor.users.find({});
});