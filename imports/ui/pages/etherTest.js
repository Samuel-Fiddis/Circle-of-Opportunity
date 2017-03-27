import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './etherTest.html';

// import '/imports/startup/client/ethereum.js';
// import '/imports/api/ethereum/ethereum.js';
// import '/imports/api/ethereum/etherscan.js';

Meteor.call('runCode', function (err, response) {
  console.log(response);
});

Template.accounts.events({
    'click button'(event, instance) {
        ethCreateAccount('password')
    },
});

Template.latestBlock.helpers({
  currentBlock() {
    return ethGetLatestBlock();
  },
});

Template.balance.helpers({
  oneEtherscanAccountBalance() {
      try {
          var result = etherscanAccountBalance("0x5097D17e4C8b2372Ae6082CEA32Ac7AFdFDE3c28");
      }
      catch(err) {
          console.log(err);
          return;
      }
      return result;
  },
  // anothEthAddress(){
  //   return ethGetBalance(0x5097D17e4C8b2372Ae6082CEA32Ac7AFdFDE3c28);
  // },
});

Template.accounts.helpers({
  allAccounts() {
    // Lists all accounts in the keystore
    return ethAllAccounts();

  },
/*
  sendTransactions(address to, address from, int wei) {

  },
*/
});
