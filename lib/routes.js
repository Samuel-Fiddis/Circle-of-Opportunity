FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('HomeLayout');
	}
});

FlowRouter.route('/universities', {
	name: 'universities',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Universities'});
	}
});

FlowRouter.route('/university/:id', {
	name: 'university',
	action() {
		BlazeLayout.render('MainLayout', {main: 'UniversitySingle'});
	}
});
