pragma solidity ^0.4.0;

contract mortal {
    /* Define variable owner of the type address*/
    address owner;

    /* this function is executed at initialization and sets the owner of the contract */
    function mortal() { owner = msg.sender; }

    /* Function to recover the funds on the contract */
    function kill() { if (msg.sender == owner) selfdestruct(owner); }
}

contract Timeout {
    mapping (address => uint) storedData;

    function set(uint val, address send_to) payable {
        // TODO: check that sendto address is valid, if not then throw

        storedData[send_to] = val;
    }

    function get(address send_to) constant returns (uint) {
        return storedData[send_to];
    }
}
