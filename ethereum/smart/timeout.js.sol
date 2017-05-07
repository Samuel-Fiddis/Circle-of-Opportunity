var timeout_sol_mortalContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"mortal","outputs":[],"payable":false,"type":"function"}]);
var timeout_sol_mortal = timeout_sol_mortalContract.new(
   {
     from: web3.eth.accounts[0],
     data: '0x6060604052341561000c57fe5b5b6101068061001c6000396000f300606060405263ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166341c0e1b581146043578063f1eae25c146052575bfe5b3415604a57fe5b60506061565b005b3415605957fe5b605060a2565b005b6000543373ffffffffffffffffffffffffffffffffffffffff90811691161415609f5760005473ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000805473ffffffffffffffffffffffffffffffffffffffff19163373ffffffffffffffffffffffffffffffffffffffff161790555b5600a165627a7a723058208b42d5a757cff83f3ae1cf3319a5597d02d9f6399df88e6ae66c568ec8d9ce0c0029',
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Mortal contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })

var timeout_sol_timeoutContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"send_to","type":"address"}],"name":"forward","outputs":[{"name":"","type":"bool"}],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"send_to","type":"address"}],"name":"set","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"send_to","type":"address"}],"name":"get_amount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"mortal","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"send_to","type":"address"}],"name":"get_release_block","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}]);
var timeout_sol_timeout = timeout_sol_timeoutContract.new(
   {
     from: web3.eth.accounts[0],
     data: '0x6060604052341561000c57fe5b5b6102b48061001c6000396000f300606060405236156100755763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663101e895281146100775780632801617e1461009f57806341c0e1b5146100b55780637c01388c146100c7578063f1eae25c146100f5578063f7d5af2214610107575bfe5b61008b600160a060020a0360043516610135565b604080519115158252519081900360200190f35b6100b3600160a060020a03600435166101c6565b005b34156100bd57fe5b6100b36101f3565b005b34156100cf57fe5b6100e3600160a060020a036004351661021b565b60408051918252519081900360200190f35b34156100fd57fe5b6100b361023e565b005b341561010f57fe5b6100e3600160a060020a0360043516610269565b60408051918252519081900360200190f35b600160a060020a03811660009081526001602052604081205442101561015d575060006101c1565b600160a060020a038216600081815260016020819052604080832090910154905181156108fc0292818181858888f19350505050151561019f575060006101c1565b50600160a060020a038116600090815260016020819052604082208101919091555b919050565b600160a060020a038116600090815260016020819052604090912034918101919091556078420190555b50565b60005433600160a060020a039081169116141561021857600054600160a060020a0316ff5b5b565b600160a060020a038116600090815260016020819052604090912001545b919050565b6000805473ffffffffffffffffffffffffffffffffffffffff191633600160a060020a03161790555b565b600160a060020a0381166000908152600160205260409020545b9190505600a165627a7a72305820d1e9771046dfbb0851cdb1cd4a461fd8bbcc9b48c418e75907e68a605adc60d40029',
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Timeout contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
/*
loadScript("/home/ugmo/Downloads/timeout.js")
var myContract = eth.contract().at('');
web3.fromWei(eth.getBalance(eth.accounts[0]), 'ether')
web3.fromWei(eth.getBalance(eth.accounts[1]), 'ether')
timeout_sol_timeout.set(eth.accounts[1], {from:eth.accounts[0], value:web3.toWei(0.01, 'ether')})
timeout_sol_timeout.get_amount(eth.accounts[0])
timeout_sol_timeout.get_amount(eth.accounts[1])
timeout_sol_timeout.get_release_block(eth.accounts[1])
web3.fromWei(eth.getBalance(eth.accounts[0]), 'ether')
web3.fromWei(eth.getBalance(eth.accounts[1]), 'ether')
timeout_sol_timeout.forward(eth.accounts[1], {from:eth.accounts[0]})
web3.fromWei(eth.getBalance(eth.accounts[0]), 'ether')
web3.fromWei(eth.getBalance(eth.accounts[1]), 'ether')
*/
