import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Universities = new Mongo.Collection('Universities');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('universities', function universitiesPublication() {
    return Universities.find();
  });
}

Universities.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});

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

Universities.publicFields = {
  name: 1,
  address: 1
};
