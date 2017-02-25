import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  EthBlocks.init();
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

Template.latestBlock.helpers({
  currentBlock() {

    return EthBlocks.latest.number+' ok ';
  },
  
  accounts() {
    return ' ok ';
  },
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
