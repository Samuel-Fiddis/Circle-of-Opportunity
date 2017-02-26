// Template level subscription
Template.Universities.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('universities');
	});
});


Template.Universities.helpers({
	universities: ()=> {
		return Universities.find({});
	}
});
