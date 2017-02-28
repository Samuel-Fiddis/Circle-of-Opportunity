Meteor.publish('universities', function(){
	return Universities.find({});
});

Meteor.publish('singleUniversity', function(id){
	check(id, String);
	return Universities.find({_id: id});
});

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
Meteor.publish('userData', function () {
	return Meteor.users.find();
});
