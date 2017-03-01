import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';

// Import to load these templates
import '../../ui/pages/homepage.js';
import '../../ui/pages/mainpage.js';
import '../../ui/pages/howitworks.js';
import '../../ui/pages/studentoverview.js';
import '../../ui/pages/viewthecircle.js';
import '../../ui/components/navBar.js'


// Import to override accounts templates


// Below here are the route definitions

FlowRouter.route('/', {
  name: 'homepage',
  action(){
    BlazeLayout.render('mainpage', {main: 'homepage'});
  },
});

FlowRouter.route('/students', {
  name: 'studentsoverview',
  action(){
    BlazeLayout.render('mainpage', {main: 'studentsoverview'});
  },
});

FlowRouter.route('/howitworks', {
  name: 'howitworks',
  action(){
    BlazeLayout.render('mainpage', {main: 'howitworks'});
  },
});

FlowRouter.route('/viewthecircle', {
  name: 'viewthecircle',
  action(){
    BlazeLayout.render('mainpage', {main: 'viewthecircle'});
  },
});
