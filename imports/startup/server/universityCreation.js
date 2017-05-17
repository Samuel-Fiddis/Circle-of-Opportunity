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
        password: "university",
        password_verification: "university",
        userType: {
          isStudent: false,
          isDonor: false,
          isUniAdmin: true,
        },
        name: {
          first: "University",
          last: "Admin",
        },
        adminFor: "Imperial College",
      };

      Accounts.createUser(newUniUser);
    }

  });
}
