var timeout_sol_timeoutContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"send_to","type":"address"}],"name":"forward","outputs":[{"name":"","type":"bool"}],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"send_to","type":"address"}],"name":"set","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"send_to","type":"address"}],"name":"get_amount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"send_to","type":"address"}],"name":"cancel_student","outputs":[{"name":"","type":"bool"}],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"mortal","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"send_to","type":"address"}],"name":"get_release_block","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}]);
var timeout_sol_timeout = timeout_sol_timeoutContract.new(
   {
     from: web3.eth.accounts[0],
     data: '0x6060604052341561000c57fe5b5b6103798061001c6000396000f300606060405236156100805763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663101e895281146100825780632801617e146100aa57806341c0e1b5146100c05780637c01388c146100d2578063ce64015f14610100578063f1eae25c14610128578063f7d5af221461013a575bfe5b610096600160a060020a0360043516610168565b604080519115158252519081900360200190f35b6100be600160a060020a03600435166101f9565b005b34156100c857fe5b6100be610227565b005b34156100da57fe5b6100ee600160a060020a036004351661024f565b60408051918252519081900360200190f35b610096600160a060020a0360043516610272565b604080519115158252519081900360200190f35b341561013057fe5b6100be610303565b005b341561014257fe5b6100ee600160a060020a036004351661032e565b60408051918252519081900360200190f35b600160a060020a038116600090815260016020526040812054421015610190575060006101f4565b600160a060020a038216600081815260016020819052604080832090910154905181156108fc0292818181858888f1935050505015156101d2575060006101f4565b50600160a060020a038116600090815260016020819052604082208101919091555b919050565b600160a060020a03811660009081526001602081905260409091209081018054340190556078420190555b50565b60005433600160a060020a039081169116141561024c57600054600160a060020a0316ff5b5b565b600160a060020a038116600090815260016020819052604090912001545b919050565b6000805433600160a060020a03908116911614610291575060006101f4565b60008054600160a060020a038481168352600160208190526040808520909101549051919092169282156108fc02929190818181858888f1935050505015156101d2575060006101f4565b50600160a060020a038116600090815260016020819052604082208101919091555b919050565b6000805473ffffffffffffffffffffffffffffffffffffffff191633600160a060020a03161790555b565b600160a060020a0381166000908152600160205260409020545b9190505600a165627a7a723058202df6c44dcb408ca3cde302ba29984572c80d75dac7a2e741eece5383429baac60029',
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Mortal Timeout contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })


/*
loadScript("/home/ugmo/Downloads/timeout.js")
// CLEATE AN EXTERNAL LINK TO CONTRACT
var myContract = eth.contract().at('');

//CHECK BALANCES
web3.fromWei(eth.getBalance(eth.accounts[0]), 'ether')
web3.fromWei(eth.getBalance(eth.accounts[1]), 'ether')

//SENT SOME ETH TO [1]
timeout_sol_timeout.set(eth.accounts[1], {from:eth.accounts[0], value:web3.toWei(0.01, 'ether')})
// CHECK AMOUNTS ON STUDENTS
timeout_sol_timeout.get_amount(eth.accounts[0])
timeout_sol_timeout.get_amount(eth.accounts[1])
timeout_sol_timeout.get_release_block(eth.accounts[1])
web3.fromWei(eth.getBalance(eth.accounts[0]), 'ether')
web3.fromWei(eth.getBalance(eth.accounts[1]), 'ether')

// FORWARD AMOUNT TO STUDENT
timeout_sol_timeout.forward(eth.accounts[1], {from:eth.accounts[0]})
timeout_sol_timeout.get_amount(eth.accounts[1])
web3.fromWei(eth.getBalance(eth.accounts[1]), 'ether')

// CANCEL STUDENT ETH AND SEND BACK TO OWNER
timeout_sol_timeout.cancel_student(eth.accounts[1], {from:eth.accounts[0]})
timeout_sol_timeout.get_amount(eth.accounts[1])
web3.fromWei(eth.getBalance(eth.accounts[0]), 'ether')

// SELF DESTRUCT contract
timeout_sol_timeout.kill.sendTransaction({from:eth.accounts[0]})
timeout_sol_timeout.get_amount(eth.accounts[1])
web3.fromWei(eth.getBalance(eth.accounts[0]), 'ether')
*/
