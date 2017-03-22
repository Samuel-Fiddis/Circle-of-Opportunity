import { ReactiveVar } from 'meteor/reactive-var';

ethGetLatestBlock = function ethGetLatestBlock() {
  var obj = web3.eth.getBlock("latest");
  return obj.number;
}

// 2/2 statements
// 1/1 branches

// creation of account and return the eth pblic address
ethCreateAccount = function ethCreateAccount(password) {
  // password 'password' by default
    var myAdrr = web3.personal.newAccount('password');
    return myAdrr;
}

// 0/1 statements
// 0/1 branches

ethAllAccounts = function ethAllAccounts(){
  var myPrimaryAccount = web3.eth.accounts;
  return myPrimaryAccount;
}

// 0/2 statements
// 0/1 branches

/*
Template.balance.helpers({
  balance() {
    var i =0;
    eth.accounts.forEach( function(e){
    console.log("  eth.accounts["+i+"]: " +  e + " \tbalance: " + web3.fromWei(eth.getBalance(e), "ether") + " ether");
    i++;
    })
  },
});

Template.balance.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    balance();
  },
});
*/
