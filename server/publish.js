// publish University collection
// *****************************

Meteor.publish('universities', function(){
	return Universities.find({});
});

// Need to look into what this is doing more
// *****************************************

Meteor.publish('singleUniversity', function(id){
	check(id, String);
	return Universities.find({_id: id});
});

// Publishing User Data with added fields
// ***************************************

// Is this actually being used or can we delete it?
Meteor.publish('userData2', function() {
	var currentUser;
	currentUser = this.userId;
	if (currentUser) {
		return Meteor.users.find({
			_id: currentUser
		}, {
		fields: {
			"emails": 1,
			"id": 1,
			"first_name": 1
		}
		});
	} else {
		return this.ready();
	}
});

// Need to get this private
Meteor.publish('userData', function () {
	return Meteor.users.find({});
});
