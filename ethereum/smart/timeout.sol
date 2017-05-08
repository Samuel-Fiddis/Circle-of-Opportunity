pragma solidity ^0.4.0;

contract Mortal {
    /* Define variable owner of the type address*/
    address owner;

    /* this function is executed at initialization and sets the owner of the contract */
    function mortal() { owner = msg.sender; }

    /* Function to recover the funds on the contract */
    function kill() { if (msg.sender == owner) selfdestruct(owner); }
}

contract Timeout is Mortal {
    struct pot {
        uint release_block;
        uint amount;
    }
    mapping (address => pot) pending_students;

    function set(address send_to) payable {
        pending_students[send_to].amount += msg.value;
        pending_students[send_to].release_block = now + 2 minutes;
    }

    function forward(address send_to) payable returns (bool) {
        if (now < pending_students[send_to].release_block) return false;
        if (!send_to.send(pending_students[send_to].amount)) return false;
        pending_students[send_to].amount = 0;
        return true;
    }

    function cancel_student(address send_to) payable returns (bool) {
        if (!owner.send(pending_students[send_to].amount)) return false;
        pending_students[send_to].amount = 0;
        return true;
    }

    function get_amount(address send_to) constant returns (uint) {
        return pending_students[send_to].amount;
    }

    function get_release_block(address send_to) constant returns (uint) {
        return pending_students[send_to].release_block;
    }
}
