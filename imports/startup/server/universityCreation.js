import { Universities } from '/imports/api/universities/universities.js';

if(Meteor.isServer) {

  Meteor.startup(function() {
    
    // Create the University that is registered with us

    if( Universities.findOne({name: "Imperial College"}) == null ) {

      var ImperialUni = {
        name: "Imperial College",
        address: "Huxley",
      }

      Universities.insert(ImperialUni);
    }

    // Create a universityAdmin user for Imperial

    var uniUser = Meteor.users.find({'emails.address': "uni@uni.uni"}).count()

    if(uniUser == 0) {

      var newUniUser = {
        email: "uni@uni.uni",
        password: "helloWorld",
        password_verification: "helloWorld",
        userType: {
          isStudent: false,
          isDonor: false,
          isUniAdmin: true,
        },
        name: {
          first: "universityAdmin",
          last: "helloWorld",
        },
        adminFor: "Imperial College",
      };

      Accounts.createUser(newUniUser);
    }

  });
}
