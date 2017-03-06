import { Meteor } from 'meteor/meteor';
import { Universities } from '../universities.js';


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