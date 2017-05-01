var timeout_sol_mortalContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]);
var timeout_sol_mortal = timeout_sol_mortalContract.new(
   {
     from: web3.eth.accounts[0],
     data: '0x6060604052341561000c57fe5b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b6101088061005f6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514603a575bfe5b3415604157fe5b60476049565b005b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141560d957600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5600a165627a7a72305820890cf422aa63739a9c3f467b6945f67c1a3174f7d026439f1ce9f452262eb7cc0029',
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Mortal contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })

 var timeout_sol_timeoutContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"sendto","type":"address"}],"name":"wait_for_approval","outputs":[],"payable":false,"type":"function"}]);
var timeout_sol_timeout = timeout_sol_timeoutContract.new(
   {
     from: web3.eth.accounts[0],
     data: '0x60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b610152806100576000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610046578063a6938dc514610058575bfe5b341561004e57fe5b61005661008e565b005b341561006057fe5b61008c600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610122565b005b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561011f57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b5b505600a165627a7a72305820d5f0740d00bc8c2059001ba11a269131b1436e407cf488ff18b7705d83fb2d440029',
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Timeout contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })

/*
loadScript("/home/ugmo/Git/circle-of-opportunity/ethereum/smart/timeout.js")
var timeoutContract = eth.contract([{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"sendto","type":"address"}],"name":"wait_for_approval","outputs":[],"payable":false,"type":"function"}]).at("");
*/
