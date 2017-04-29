import { Meteor } from 'meteor/meteor';
import { Universities } from '../universities.js';

// *****************************************************************************
// File holding all the University related publications subscribed to by client
// *****************************************************************************

/* Currently being published from universities.js */


// Publish the full University collection
// --------------------------------------

Meteor.publish('universities', function(){

	// Return pointer to full collection
	// ---------------------------------
	return Universities.find({}, { fields: Universities.publicFields });

});


// Publish the document of a single university (identified by id)
// --------------------------------------------------------------

Meteor.publish('singleUniversity', function(id){

	// validation check (security purposes)
	// ------------------------------------
	check(id, String);

	// return document
	// ---------------
	return Universities.find({_id: id});

});

Meteor.publish('uniCollectionData', function(id) {
	check(id,String);
	user = Meteor.users.findOne({_id: id});
	uniId = user.adminFor;
	return Universities.find({_id: uniId});
})
