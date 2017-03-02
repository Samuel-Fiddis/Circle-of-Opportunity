Universities = new Mongo.Collection('Universities');

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
});

Universities.attachSchema( UniversitySchema );


Factory.define('university', Universities, {
});