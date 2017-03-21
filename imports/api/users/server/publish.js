import { Meteor } from 'meteor/meteor';

// Need to get this private
Meteor.publish('userData', function () {
  // console.log("Jack is annoying");
	return Meteor.users.find({});
});
