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
  console.log(fromAddress);
  console.log(fromPassword);
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


// This should be stored somewhere else
var contractAbi = web3.eth.contract([{"constant":false,"inputs":[{"name":"send_to","type":"address"}],"name":"forward","outputs":[{"name":"","type":"bool"}],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"send_to","type":"address"}],"name":"set","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"send_to","type":"address"}],"name":"get_amount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"send_to","type":"address"}],"name":"cancel_student","outputs":[{"name":"","type":"bool"}],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"mortal","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"send_to","type":"address"}],"name":"get_release_block","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}]);

// Create smart contract
ethCreateSmartContract = function ethCreateSmartContract(ownerAddress, ownerPassword, _callback){

  web3.personal.unlockAccount(ownerAddress, ownerPassword);

  

  var mined = false;
  
  var timeout_sol_timeout = contractAbi.new(
     {
       from: web3.eth.accounts[0],
       data: '0x6060604052341561000c57fe5b5b6103798061001c6000396000f300606060405236156100805763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663101e895281146100825780632801617e146100aa57806341c0e1b5146100c05780637c01388c146100d2578063ce64015f14610100578063f1eae25c14610128578063f7d5af221461013a575bfe5b610096600160a060020a0360043516610168565b604080519115158252519081900360200190f35b6100be600160a060020a03600435166101f9565b005b34156100c857fe5b6100be610227565b005b34156100da57fe5b6100ee600160a060020a036004351661024f565b60408051918252519081900360200190f35b610096600160a060020a0360043516610272565b604080519115158252519081900360200190f35b341561013057fe5b6100be610303565b005b341561014257fe5b6100ee600160a060020a036004351661032e565b60408051918252519081900360200190f35b600160a060020a038116600090815260016020526040812054421015610190575060006101f4565b600160a060020a038216600081815260016020819052604080832090910154905181156108fc0292818181858888f1935050505015156101d2575060006101f4565b50600160a060020a038116600090815260016020819052604082208101919091555b919050565b600160a060020a03811660009081526001602081905260409091209081018054340190556078420190555b50565b60005433600160a060020a039081169116141561024c57600054600160a060020a0316ff5b5b565b600160a060020a038116600090815260016020819052604090912001545b919050565b6000805433600160a060020a03908116911614610291575060006101f4565b60008054600160a060020a038481168352600160208190526040808520909101549051919092169282156108fc02929190818181858888f1935050505015156101d2575060006101f4565b50600160a060020a038116600090815260016020819052604082208101919091555b919050565b6000805473ffffffffffffffffffffffffffffffffffffffff191633600160a060020a03161790555b565b600160a060020a0381166000908152600160205260409020545b9190505600a165627a7a723058202df6c44dcb408ca3cde302ba29984572c80d75dac7a2e741eece5383429baac60029',
       gas: '4700000'
     }, function (e, contract){
      console.log(e, contract);
      if (typeof contract.address !== 'undefined') {
          console.log('Mortal Timeout contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
        console.log(contract.address);
        _callback(contract.address);
      }
   });
  
}

// Fill smart contract
ethFillStudentContract = function ethFillStudentContract(contractAddress, toAddress, fromAddress, fromPassword, amount){
  var targetContract = contractAbi.at(contractAddress);
  web3.personal.unlockAccount(fromAddress, fromPassword);

  targetContract.set(toAddress, {from:fromAddress, value:web3.toWei(amount, 'ether')})

  var newBalance = targetContract.get_amount(toAddress);
  

  
}

// Forward smart contract
ethGetContractBalance = function ethForwardStudentContract(contractAddress, toAddress){
  var targetContract = contractAbi.at(contractAddress);

  var balance = targetContract.get_amount(toAddress);
  console.log("contract balance in ether");
  console.log(balance.c[0]/10000);
}

// Forward smart contract
ethForwardStudentContract = function ethForwardStudentContract(contractAddress, toAddress, fromAddress, fromPassword){
  var targetContract = contractAbi.at(contractAddress);
  web3.personal.unlockAccount(fromAddress, fromPassword);

  targetContract.forward(toAddress, {from:fromAddress})
  
}


// Forward smart contract
ethCancelStudentContract = function ethCancelStudentContract(contractAddress, toAddress, ownerAddress, ownerPassword){
  var targetContract = contractAbi.at(contractAddress);
  web3.personal.unlockAccount(ownerAddress, ownerPassword);

  targetContract.cancel_student(toAddress, {from:ownerAddress})
  
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
