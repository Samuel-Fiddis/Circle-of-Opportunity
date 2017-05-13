import { ReactiveVar } from 'meteor/reactive-var';

// define the web3 object on the server side
// Server Configuration
var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

// Get the latest block number on whih we are working on
ethGetLatestBlock = function ethGetLatestBlock() {
  var obj = web3.eth.getBlock("latest");
  return obj.number;
}

// creation of account and return the eth public address as a string
ethCreateAccount = function ethCreateAccount(password) {
  // password 'password' by default
  var myAdrr = web3.personal.newAccount('password');
  return myAdrr;
}

// Return al the accounts stored in our keystore, returns an array of strings of addresses
ethAllAccounts = function ethAllAccounts(){
  var myPrimaryAccount = web3.eth.accounts;
  return myPrimaryAccount;
}

// Get the balance of an account given the public key, returns a number
ethGetBalance = function ethGetBalance(myEthAddr){
  var myBalance = web3.fromWei(web3.eth.getBalance(myEthAddr), "ether");
  // convert from Big Number to number
  return myBalance.toNumber();
}

// Send Ether from one account to another, returns the transaction hash
// fromAccount should be an account in keystore
ethSendEtherTransaction = function ethSendEtherTransaction(fromAddress, fromPassword, toAddress, valueEther){
  console.log("fromAddress");
  console.log(fromAddress);
  console.log("fromPassword");
  console.log(fromPassword);
  // unlock the account with appropritae passphrase
  web3.personal.unlockAccount(fromAddress, fromPassword);
  // TODO: test above function does not fail from no keyfile or incorrect password;
  var transactionObject = {
    from: fromAddress,
    to: toAddress,
    value: web3.toWei(valueEther, 'ether'),
  };

  var result;
  //with asynchronous callback function
  //result = web3.eth.sendTransaction(transactionObject, function() {  });

  result = web3.eth.sendTransaction(transactionObject);
  // TODO: test above function does not fail from insufficient funds

  return result;
}

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
