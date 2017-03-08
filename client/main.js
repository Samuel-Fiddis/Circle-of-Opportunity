import { Template } from 'meteor/templating';
//import { ReactiveVar } from 'meteor/reactive-var';

EthBlocks.init();

import '../imports/api/ethereum.js';
import '../imports/api/etherscan.js';

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
