var greeter_sol_mortalContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]);
var greeter_sol_mortal = greeter_sol_mortalContract.new(
   {
     from: web3.eth.accounts[0],
     data: '0x6060604052341561000c57fe5b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b6101088061005f6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514603a575bfe5b3415604157fe5b60476049565b005b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141560d957600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5600a165627a7a72305820c9e92cd6d3595a5cc224178a9c7210454dfac9d3579daad4d15e7a9a48a583610029',
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })

 var greeter_sol_timeoutContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pendingBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"sendto","type":"address"}],"name":"amount_pending","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"sendto","type":"address"},{"name":"weiAmount","type":"uint256"}],"name":"wait_for_approval","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"}]);
var greeter_sol_timeout = greeter_sol_timeoutContract.new(
   {
     from: web3.eth.accounts[0],
     data: '0x60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b6102c8806100576000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633736f85d1461005c57806341c0e1b5146100a65780634eaeae64146100b8578063a7b0baf014610102575bfe5b341561006457fe5b610090600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610159565b6040518082815260200191505060405180910390f35b34156100ae57fe5b6100b6610171565b005b34156100c057fe5b6100ec600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610205565b6040518082815260200191505060405180910390f35b341561010a57fe5b61013f600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061024f565b604051808215151515815260200191505060405180910390f35b60016020528060005260406000206000915090505481565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561020257600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b919050565b600081600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b929150505600a165627a7a7230582051e5fbc3b5bc9a1304728f844790a9d2c2d6431d36a05c6fa6aeac4b9dfd1d220029',
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
