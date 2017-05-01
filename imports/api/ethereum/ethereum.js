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

  // unlock the account with appropritae passphrase
  web3.personal.unlockAccount(fromAddress, fromPassword);
  //if (!web3.personal.unlockAccount(fromAddress, fromPassword)){
  //  throw "sendFrom account is not unlocked";
  //};

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
  /*
  if (result == false) {
      throw "sendTransaction function failed"
  }

  for(i = 0; i < 60; i++) {
    await sleep(1000);
    status = eth.getTransaction(result);
    if ( status.blockNumber != null || satus.blockNumber > 0) {
      break;
    }
  }*/

  return result;
}

/*
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}/*
