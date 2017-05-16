import { Meteor } from 'meteor/meteor';
import { Transactions } from '../transactions/transactions.js';

Meteor.methods({

  reallocate: function() {

    console.log('Entering reallocation method');
    // Set up variables to be used
    var balance_table = [];
    var potBalance = ethGetBalance('0xc08ee9c6252fb61271520dacac9a6126255bc81e');
    var totalEther = potBalance;
    var gasPrice = 0.005;

    // Get all of the students data and store in an array
    var users = Meteor.users.find({"userType.isStudent": true},{fields:{'_id': 1,'ethereum': 1, 'name': 1, 'uni_info': 1}}).fetch();

    console.log(users);

    // Create a table detailing all of the students current funds and get the total balance
    for(i = 0; i < users.length; i++){
      // Check if the user has their target reached oor hass been accepted
      if(users[i].uni_info.eStatus == "accepted" || users[i].uni_info.eStatus == "targetReached"){
        ethBalance = ethGetBalance(users[i].ethereum);
        // Get the remaining Ethereum balance required.
        ethRequired = (users[i].uni_info.allowance_eth * 10) + users[i].uni_info.tuition_eth - ethBalance;
        totalEther += ethBalance;
        balance_table.push({_id: users[i]._id,ethereum: users[i].ethereum,name: users[i].name, balance: ethBalance, required: ethRequired});
      }
    }

    console.log('Total Balance:');
    console.log(totalEther);

    // Sort the table from lowest to highest amount of ether required
    balance_table.sort(function(a,b) {return (a.required > b.required) ? 1 : ((b.required > a.required) ? -1 : 0);});

    console.log(balance_table);

    // Determine who in the balance_table is in the cut off and who isn't
    var numAccepted = 0;
    var balanceRemaining = totalEther;
    for(i = 0; i < balance_table.length; i++){
      funding = balance_table[i].required + balance_table[i].balance;
      if(balanceRemaining > funding && balance_table[i].required > 0){
        numAccepted++;
        balanceRemaining -= funding;
      }
    }

    if(balance_table.length < numAccepted) numAccepted = balance_table.length;

    console.log(numAccepted);

    // Take all of the Ether in each students account who is cut off and put it in the general pot
    for(i = numAccepted;i < balance_table.length; i++){
      console.log('In student to GP reallocation step');
      var transferBalance = balance_table[i].balance - gasPrice;
      console.log(transferBalance);
      if(transferBalance > 0){
        var trans = ethSendEtherTransaction(balance_table[i].ethereum,"password",'0xc08ee9c6252fb61271520dacac9a6126255bc81e',transferBalance);
        console.log(trans);

        var idD = balance_table[i]._id;
        var nD = balance_table[i].name;
        var a = transferBalance;

        var options = {
          type : "StG",
          idSender: idD,
          idReceiver: "generalPotId",
          nameSender: nD.first + " " + nD.last,
          nameReceiver: "the general pot",
          amount: a,
          transactionHash: trans,
        }

        Transactions.insert(options);
      }
    }

    // Need a timeout to make sure that funds are in the general pot
    console.log("Starting Timeout");
    Meteor.setTimeout(function(){
        GPtoStudentReallocation(numAccepted, balance_table)
    }, 120000);

  },

});

function GPtoStudentReallocation(numAccepted, balance_table){

      console.log("Entered GP to Student Reallocation Function");
      console.log(numAccepted);
      console.log(balance_table);
      // Take all of the funds in the general pot and distribute them to the remaining students
      for(i = 0; i < numAccepted; i++){
        console.log('In GP to student reallocation step');
        var transferBalance = balance_table[i].required;
        console.log(transferBalance);

        if(transferBalance > 0){
          var trans = ethSendEtherTransaction('0xc08ee9c6252fb61271520dacac9a6126255bc81e',"general",balance_table[i].ethereum,transferBalance);
          console.log(trans);

          var idS = balance_table[i]._id;
          var nS = balance_table[i].name;
          var a = transferBalance;

          var options = {
            type : "GtS",
            idSender: "generalPotId",
            idReceiver: idS,
            nameSender: "the general pot",
            nameReceiver: nS.first + " " + nS.last,
            amount: a,
            transactionHash: trans,
          }

          Transactions.insert(options);
        }
      }
      return true;
  }
