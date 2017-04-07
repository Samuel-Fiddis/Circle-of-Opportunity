import { Meteor } from 'meteor/meteor';

Meteor.methods({

  createTransaction: function(options) {

    var userId;

    check(options,
      {
        // All users will have the following upon registration
        type: String,
        idStudent: String,
        idDonor: String,
        amount: String,
        transaction: String,
      },

    Transactions.createTrans(options);

},

});
