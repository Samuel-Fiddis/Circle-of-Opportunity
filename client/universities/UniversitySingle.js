// Template level subscription
Template.UniversitySingle.onCreated(function() {
	var self = this;
	self.autorun(function() {
		var id = FlowRouter.getParam('id');
		self.subscribe('singleUniversity', id);
		self.subscribe('userData');
	});
});


Template.UniversitySingle.helpers({
	university: ()=> {
		var id = FlowRouter.getParam('id')
		return Universities.findOne({_id: id});
	}
});

Template.UniversitySingle.helpers({
	thisUser: ()=> {
		return Meteor.users.findOne();
	}
});
