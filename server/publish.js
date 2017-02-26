Meteor.publish('universities', function(){
	return Universities.find({author: this.userId});
});

Meteor.publish('singleUniversity', function(id){
	check(id, String);
	return Recipes.find({_id: id});
});
