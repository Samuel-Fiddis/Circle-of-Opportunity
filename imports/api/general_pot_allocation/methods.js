import { Meteor } from 'meteor/meteor';

Meteor.methods({

  reallocate: function(options) {

    // Get all of the students data and store in an array
    var users = Meteor.users.find({"userType.isStudent": true},{fields:{'_id': 1,'ethereum': 1}});

    // Create a table detailing all of the students current funds
    var balance_table;
    for(i = 0; i < users.length(); i++){
      ethBalance = ethGetBalance(users[i].ethereum);
      balance_table.push({user: users[i], balance: ethBalance});
      console.log(balance_table[i]);
    }

    

    // Sort the table from highest to lowest
    // Determine who is in the cut off and who isn't
    // Take all of the Ether in each students account who is cut off and put it in the general pot
    // Take all of the funds in the general pot and distribute them to the remaining students

  }
});
