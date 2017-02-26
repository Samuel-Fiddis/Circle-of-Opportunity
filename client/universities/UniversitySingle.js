// Template level subscription
Template.UniversitySingle.onCreated(function() {
	var self = this;
	self.autorun(function() {
		var id = FlowRouter.getParam('id');
		self.subscribe('singleUniversity', id);
	});
});


Template.UniversitySingle.helpers({
	recipe: ()=> {
		var id = FlowRouter.getParam('id')
		return Universities.findOne({_id: id});
	}
});
