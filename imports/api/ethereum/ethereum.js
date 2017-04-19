import { ReactiveVar } from 'meteor/reactive-var';

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
  // unlock the account with appropritae passphrase
  web3.personal.unlockAccount(fromAddress, fromPassword);
  // TODO: test above function does not fail from no keyfile or incorrect password

  var transactionObject = {
    from: fromAddress,
    to: toAddress,
    // valueEther in ether, convert it in wei
    value: web3.toWei(valueEther, 'ether')- web3.eth.gasPrice.toNumber()*21000,
    gas: 21000,
  };

  var result;
  //with asynchronous callback function
  //result = web3.eth.sendTransaction(transactionObject, function() {  });

// test above function does not fail from insufficient funds
  if (web3.toWei(valueEther, 'ether') > web3.eth.getBalance(fromAddress) ){
  //  throw new Meteor.Error("Insuficcient funds","Warning");
    // TODO : handling the error and false statement
  }
  else{
    result = web3.eth.sendTransaction(transactionObject);
    console.log(result);
  }
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
