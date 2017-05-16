import { Meteor } from 'meteor/meteor';
import { Transactions } from '../transactions/transactions.js';

var contractAddress = "0x42f8fa50b8fafeb03e937a1cf44b58f61ab8fe22";

Meteor.methods({
  create_contract: function() {
    console.log('Smart contract creation');

    var ownerAddress = "0x0b0be3d00a30095b38cb4838b355f83ed6693423";
    var ownerPassword = "jackAccount1";
    var contractAddress;
    var contract = ethCreateSmartContract(ownerAddress,ownerPassword, 
          function(_contractAddress) {
            contractAddress = _contractAddress;
            // Must store contract address for use in setting student amount
    });
  },

  fill_student_contract: function(options) {
    console.log('Fill smart contract for student');
    console.log(options.studentId);   
    
    var student = Meteor.users.findOne({_id: options.studentId});
    var fromAddress = student.ethereum;
    //var fromPassword = Meteor.settings.pwdStudentCoo;
    var fromPassword = "password";
    var toAddress = student.ethereum_ext;
    var amount = student.uni_info.allowance_eth;
    
    var transactionHash = ethFillStudentContract(contractAddress, toAddress, fromAddress, fromPassword, amount);

    console.log("transaction Hash");
    console.log(transactionHash);

    var options = {
      type : "StC",
      idSender: student._id,
      nameSender: student.name.first + " " + student.name.last,
      amount: amount,
    }
    options.transactionHash = transactionHash;
    options.idReceiver =  contractAddress;
    options.nameReceiver =  "Contract";

    return Transactions.insert(options);
  },

  fill_all_students: function() {
    console.log('Fill smart contract for all students');  
    var students = Meteor.users.find({"uni_info.eStatus":"universityPaid"});

    students.forEach(function(student){
        console.log(student);
        var fromAddress = student.ethereum;
        //var fromPassword = Meteor.settings.pwdStudentCoo;
        var fromPassword = "password";
        var toAddress = student.ethereum_ext;
        var amount = student.uni_info.allowance_eth;
        var transactionHash = ethFillStudentContract(contractAddress, toAddress, fromAddress, fromPassword, amount);
        console.log(transactionHash);
        var options = {
          type : "StC",
          idSender: student._id,
          nameSender: student.name.first + " " + student.name.last,
          amount: amount,
        }
        options.transactionHash = transactionHash;
        options.idReceiver =  "contractAddress";
        options.nameReceiver =  "Contract";

        return Transactions.insert(options);
    });
  },

  get_student_contract_balance: function(options) {
    console.log('Get student contract balance');
    console.log(options.studentId);   
    var student = Meteor.users.findOne({_id: options.studentId});
    
    var toAddress = student.ethereum_ext;

    ethGetContractBalance(contractAddress, toAddress);
    
  },

  forward_student_contract: function(options) {
    console.log('Forward smart contract for student');
    console.log(options.studentId);   
    
    var student = Meteor.users.findOne({_id: options.studentId});
    var fromAddress = student.ethereum;
    //var fromPassword = Meteor.settings.pwdStudentCoo;
    var fromPassword = "password";
    var toAddress = student.ethereum_ext;

    var transactionHash = ethForwardStudentContract(contractAddress, toAddress, fromAddress, fromPassword);

    var amount = student.uni_info.allowance_eth;
    var options = {
      type : "CtO",
      idSender: contractAddress,
      nameSender: "Smart Contract",
      amount: amount,
    }
    options.transactionHash = transactionHash;
    options.idReceiver =  toAddress;
    options.nameReceiver =  student.name.first + " " + student.name.last;

    return Transactions.insert(options);
    
  },

  forward_all_students: function() {
    console.log('Forward smart contract for all students');  
    // Crude, need to only forward for users with money in contract
    var students = Meteor.users.find({"uni_info.eStatus":"universityPaid"});

    students.forEach(function(student){
        console.log(student);
        
        var fromAddress = student.ethereum;
        //var fromPassword = Meteor.settings.pwdStudentCoo;
        var fromPassword = "password";
        var toAddress = student.ethereum_ext;

        var transactionHash = ethForwardStudentContract(contractAddress, toAddress, fromAddress, fromPassword);

        var amount = student.uni_info.allowance_eth;
        var options = {
          type : "CtO",
          idSender: contractAddress,
          nameSender: "Smart Contract",
          amount: amount,
        }
        options.transactionHash = transactionHash;
        options.idReceiver =  toAddress;
        options.nameReceiver =  student.name.first + " " + student.name.last;

        return Transactions.insert(options);
    });
  },

  cancel_student_contract: function(options) {
    console.log('Cancel smart contract for student');
    console.log(options.studentId);   
    
    var student = Meteor.users.findOne({_id: options.studentId});
    var ownerAddress = "0x0b0be3d00a30095b38cb4838b355f83ed6693423";
    var ownerPassword = "jackAccount1";
    var toAddress = student.ethereum_ext;

    ethCancelStudentContract(contractAddress, toAddress, ownerAddress, ownerPassword);
    
  },

  cancel_all_students: function() {
    console.log('Cancel smart contract for all students');
    var students = Meteor.users.find({"uni_info.eStatus":"universityPaid"});
    var ownerAddress = "0x0b0be3d00a30095b38cb4838b355f83ed6693423";
    var ownerPassword = "jackAccount1";
    students.forEach(function(student){
      var toAddress = student.ethereum_ext;

      ethCancelStudentContract(contractAddress, toAddress, ownerAddress, ownerPassword);
    });
    
  },

  kill_smart_contract: function(options) {
    console.log('Kill smart contract');
    console.log(options.contractId);   
    //var contractAddress = "0x80195f5fcc7435d900a9ce726736070ef11d0d93";
    var contractAddress = options.contractId;
    var ownerAddress = "0x0b0be3d00a30095b38cb4838b355f83ed6693423";
    var ownerPassword = "jackAccount1";
    ethKillSmartContract(contractAddress, ownerAddress, ownerPassword);
    
  },

  get_balance: function(options) {
    console.log('Get balance');
    console.log(options.address);
    var balance = ethGetBalance(options.address);
    console.log(balance);
    
  },

});
