pragma solidity ^0.4.0;

contract mortal {
    /* Define variable owner of the type address*/
    address owner;

    /* this function is executed at initialization and sets the owner of the contract */
    function mortal() { owner = msg.sender; }

    /* Function to recover the funds on the contract */
    function kill() { if (msg.sender == owner) selfdestruct(owner); }
}

contract timeout is mortal {
    mapping (address => uint) public pendingBalance;

    function wait_for_approval(address sendto, uint weiAmount) returns (bool) {
        // TODO: check that sendto address is valid, if not then throw

        pendingBalance[sendto] = weiAmount;

    }

    function amount_pending(address sendto) returns (uint) {
        return pendingBalance[sendto];
    }
}
