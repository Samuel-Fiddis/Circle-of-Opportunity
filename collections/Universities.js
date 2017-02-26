Universities = new Mongo.Collection('universities');

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
<<<<<<< HEAD
=======
	}
>>>>>>> 1a4a39e1b61c3565bd8bdb057f74f993dae965d4
});

Universities.attachSchema( UniversitySchema );
