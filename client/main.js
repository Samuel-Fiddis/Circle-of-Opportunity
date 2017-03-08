import { Template } from 'meteor/templating';

import '../imports/startup/client/ethereum.js';

import '../imports/api/ethereum.js';
import '../imports/api/etherscan.js';

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
