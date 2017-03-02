Meteor.publish('universities', function(){
	return Universities.find({author: this.userId});
});

Meteor.publish('singleUniversity', function(id){
	check(id, String);
	return Universities.find({_id: id});
});