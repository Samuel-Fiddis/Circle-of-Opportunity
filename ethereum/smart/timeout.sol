pragma solidity ^0.4.0;

contract Timeout {
    mapping (address => uint) storedData;

    function set() payable {
        storedData[msg.sender] = msg.value;
    }

    function get() constant returns (uint) {
        return storedData[msg.sender];
    }
}
