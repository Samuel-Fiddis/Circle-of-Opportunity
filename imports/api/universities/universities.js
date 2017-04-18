import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Universities = new Mongo.Collection('Universities');


// Users can insert into the collection from client code
// -----------------------------------------------------
Universities.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});

// Create schema and attach to collection
// --------------------------------------
UniversitySchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
	},
	address: {
		type: String,
		label: "Address"
	},
	/*
	author: {
		type: String,
		label: "Author",
		autoValue: function() {
			return this.userId
		},
		autoform: {
			type: "hidden"
		}
	},
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			return new Date()
		},
		autoform: {
			type: "hidden"
		}
	}
	*/
});

Universities.attachSchema( UniversitySchema );

// Define set of publicFields for publishing
// --------------------------------------------
Universities.publicFields = {
  name: 1,
  address: 1
};