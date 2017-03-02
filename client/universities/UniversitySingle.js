import { Template } from 'meteor/templating';

import '../../collections/Universities.js'
import './UniversitySingle.html'

// Template level subscription
Template.UniversitySingle.onCreated(function() {
	var self = this;
	self.autorun(function() {
		var id = FlowRouter.getParam('id');
		self.subscribe('singleUniversity', id);

	});
});


Template.UniversitySingle.helpers({
	university: ()=> {
		var id = FlowRouter.getParam('id')
		return Universities.findOne({_id: id});
	}
});

