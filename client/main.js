import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

Template.latestBlock.onCreated(function latestBlockOnCreated() {

  EthBlocks.init();
});

Template.latestBlock.helpers({
  currentBlock() {
    return EthBlocks.latest.number;
  },
});

Template.accounts.onCreated(function accountsOnCreated() {
    this.counter = new String("");
});

Template.accounts.events({
  'click button'(event, instance) {
  web3.personal.newAccount('password');
  /*  var myAdrr = web3.personal.newAccount('password');
    instance.counter = myAdrr;
    console.log(myAdrr);
    console.log(instance.counter);*/
  },
});

Template.accounts.helpers({
  allAccounts() {
    // Lists all accounts in the keystore
    var myPrimaryAccount = web3.eth.accounts;
    return myPrimaryAccount;
  },

  createAccount() {
    //return Template.instance().counter.get();
  },
/*
  accountBalance(address publicKey) {

  },

  sendTransactions(address to, address from, int wei) {

  },
*/
});


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
