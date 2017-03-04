// Route for the Home Page
// ***********************
FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('HomeLayout');
	}
});

// Route for the Universities Page
// *******************************

FlowRouter.route('/universities', {
	name: 'universities',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Universities'});
	}
});

// Again still not sure
// *********************

FlowRouter.route('/university/:id', {
	name: 'university',
	action() {
		BlazeLayout.render('MainLayout', {main: 'UniversitySingle'});
	}
});

// Route for the register Page
// ***************************

FlowRouter.route('/register', {
	name: 'register',
	action() {
		BlazeLayout.render('MainLayout', {main: 'register'});
	}
});

// Route for the student overview page
// ***********************************

FlowRouter.route('/studentOverview', {
	name: 'studentOverview',
	action() {
		BlazeLayout.render('MainLayout', {main: 'studentView'});
	}
})
