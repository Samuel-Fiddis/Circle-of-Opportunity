import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore'

import { Universities } from '../../collections/Universities.js'
import './UniversitySingle.html'

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