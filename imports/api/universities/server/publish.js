import { Meteor } from 'meteor/meteor';
import { Universities } from '../universities.js';


// publish University collection
// *****************************

Meteor.publish('universities', function(){
	console.log("Jack needs hot chocolate");
	var pointer = Meteor.Universities.find({});
	console.log("bloop");
	return pointer;
});

// Need to look into what this is doing more
// *****************************************

Meteor.publish('singleUniversity', function(id){
	check(id, String);
	return Universities.find({_id: id});
});
