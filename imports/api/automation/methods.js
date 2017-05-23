import { Meteor } from 'meteor/meteor';
import { Universities } from '/imports/api/universities/universities.js';
import { Transactions } from '../transactions/transactions.js';

Meteor.methods({

  cycleOne: function() {
    var studentIds =[];
    studentIds = createStudents1();
    var donorIds = [];
    donorIds = createDonors1();
    console.log(donorIds)
    var acceptedStudentIds = [];
    acceptedStudentIds = acceptStudents(studentIds, 3);
    rejectStudents(studentIds, 1);
    //donateMoney1(donorIds, studentIds);

    // Donate to all students
    // Donate to General pot
    // Donate to student 1 -> targetReached
    
    // get ids of studentand donor
    //tx1 =  student1, donor1, 0.16
    //tx2 = student1, donor2, 0.10
    //tx3 = student2, donor3, 0.15
    //tx4 = student3, donor1, 0.08
    //tx5 = GP, donor2, 0.10
    var donorIds = donorIds;
    console.log("donorIds");
    console.log(donorIds);
    
    // Student, Donor, Amount
    var transactions = [
      [1, 1, 0.16],
      [1, 2, 0.10],
      [2, 3, 0.15],
      [3, 1, 0.08],
      [0, 2, 0.10]
    ]

    var transactionCount = transactions.length;
    for(i=0; i < transactionCount; i++){
      var transaction = transactions[i];
      var idReceiver;
      var studentIndex = transaction[0]-1;
      

      var donorIndex = transaction[1]-1;
      var donorId = donorIds[donorIndex];
      var donorUser = Meteor.users.findOne({_id: donorId});
      var donorName = donorUser.name;

      var amount = transaction[2];
      // Donation to General Pot
      if(studentIndex < 0){
        var options = {
          type : "DtG",
          idSender: donorId,
          nameSender: donorName.first + " " + donorName.last,
          amount: amount,
        }
        Meteor.call('donatenow', options, function(error, result) {
          console.log("Entering donatenow");

          if(error) {
            console.log("Error Flag");
            console.log(error.reason);
          }
          else {
            console.log("transaction done");
          }
        });
      } else {
        var studentId = studentIds[studentIndex];
        var studentUser = Meteor.users.findOne({_id: studentId});
        var studentName = studentUser.name;

        var options = {
          type : "DtS",
          idReceiver: studentId,
          nameReceiver: studentName.first + " " + studentName.last,
          idSender: donorId,
          nameSender: donorName.first + " " + donorName.last,
          amount: amount,
        }
        console.log("options");
        console.log(options);
        //Meteor.setTimeout(function(){
        Meteor.call('createTransaction', options, function(error, result) {
          // What happens if methods function returns an error
          // +++++++++++++++++++++++++++++++++++++++++++++++++
          console.log("Entering createTransaction");

          if(error) {
            // display the error on the console log of the website
            console.log("Error Flag");
            console.log(error.reason);
            template.lastError.set(error.reason);
          }
          // What happens if methods function works fine
          else {
            console.log("transaction done");
          }
        });
        //}, 4000);
        console.log("about to enter Target Checking");
        Meteor.call('checkTarget',studentId);
      }
    }

    //acceptOpportunities(acceptedStudentIds);
  },

  cycleTwo: function() {
    createStudents2();
    createDonors2();
    acceptStudents(5);
    rejectStudents(1);
    donateMoney2();
    //acceptOpportunities();
  },
  
  payAllUnis: function() {
    var targetReachedStudents = Meteor.users.find({"uni_info.eStatus":"targetReached"});
    console.log("targetReachedStudents");
    var uniUser = Meteor.users.findOne({"userType.isUniAdmin": true});
    var uniId = uniUser._id;
    var uniName = uniUser.name;
    targetReachedStudents.forEach(function(student){
      console.log("student");
      console.log(student);
      var studentId = student._id;
      /*
      Meteor.call('updateStatus', studentId, "acceptedOpportunity", function(error, result) {
        if(error) {
          // display the error on the console log of the website
          console.log(error.reason);
        };

      });*/
      console.log("student2");
      console.log(student);
      var amount = student.uni_info.tuition_eth;
      var studentName = student.name;
      var options = {
        type : "StU",
        idReceiver: uniId,
        nameReceiver: uniName.first + " " + uniName.last,
        idSender: studentId,
        nameSender: studentName.first + " " + studentName.last,
        amount: amount,
      }
      Meteor.call('createTransaction', options, function(error, result) {
        console.log("Entered Method Flag");

        if(error) {
          console.log("Error Flag");
          console.log(error.reason);
        }
        else {
          console.log("transaction done");
          //  FlowRouter.go('/??')

        }
      });
      Meteor.call('updateStatus', studentId, "universityPaid", function(error, result) {
        if(error) {
          // display the error on the console log of the website
          console.log(error.reason);
        };
      });
    });
  },

  graduateAll: function() {
    var uniPaidStudents = Meteor.users.find({"uni_info.eStatus":"universityPaid"});
    console.log("uniPaidStudents");
    uniPaidStudents.forEach(function(student){
      var studentId = student._id;
      Meteor.call('updateStatus', studentId, "graduated", function(error, result) {
        if(error) {
          // display the error on the console log of the website
          console.log(error.reason);
        };
      });
    });
  },

  clearDB: function() {
    // drop all users
    var users_to_remove = Meteor.users.find({'emails.address': {$ne : "uni@uni.uni"}});
    users_to_remove.forEach(function(student){
      var studentId = student._id;
      console.log(studentId);
      Meteor.users.remove({ _id: studentId });
    });

    var transactions_to_remove = Transactions.find();
    transactions_to_remove.forEach(function(transaction){
      var transactionId = transaction._id;
      console.log(transactionId);
      Transactions.remove({ _id: transactionId });
    });

    
    // drop all transactions
  },
});

function createStudents1(){
  // Create 4 students
  var studentCount = 4;
  var studentLastNames = ["One", "Two", "Three", "Four"];
  var eth_ext = [
    "0x18bd045ffd606776494f00a7e2aff21d3341f777",
    "0x617704c1e7d7d213c299ad41ad90010150315c96",
    "0x93ee1010e6302b2b73a070ad638e579601b2ecaf",
    "0xe9475d5dd4b900e746cf671a5cd32cc599026266",
    ];
  var uni = Universities.findOne({name: "Imperial College"});
  var uni_name = uni.name;
  var studentIds = [];
  for(i = 0; i < studentCount; i++){
    var myAddr = ethCreateAccount();
    var ethereum_external = eth_ext[i];
    var last_name = studentLastNames[i];
    var newStudent = {
      email: "student" + (i+1).toString() + "@coreygarvey.com",
      password: "student",
      password_verification: "student",
      userType: {
        isStudent: true,
        isDonor: false,
        isUniAdmin: false,
      },
      name: {
        first: "Student",
        last: last_name,
      },
      uni_info: {
        name: uni_name,
        uni: uni._id,
        program: "Msc of Computing Science",
        eStatus: "pending",
        tuition: 13500,
        tuition_eth: .125,
        allowance: 1256,
        allowance_eth: .0125,
        deadline: "Mid-August",
        payments_remaining: 10,
      },
      phone: "+44-5555-555555",
      address: {
        country: "UK",
        city: "London",
        street: "180 Queen's Gate",
        zipCode: "SW7 2AZ",
      },
      age: (22+i),
      allowance: true,
      ethereum_ext: ethereum_external,
      pledge: true,
      ethereum: myAddr,
    };
    var studentId = Accounts.createUser(newStudent);
    console.log("studentId");
    console.log(studentId);
    studentIds.push(studentId);
  }
  return studentIds;
}
    
function createDonors1() {
  // Create 3 donors
  var donorCount = 3;
  var donorLastNames = ["One", "Two", "Three"];

  var donorIds = [];
  var eth_ext = [
    "0x18bd045ffd606776494f00a7e2aff21d3341f777",
    "0x617704c1e7d7d213c299ad41ad90010150315c96",
    "0x93ee1010e6302b2b73a070ad638e579601b2ecaf",
    ];
  var uni = Universities.findOne({name: "Imperial College"});
  var uni_name = uni.name;
  for(i = 0; i < donorCount; i++){
    var myAddr = ethCreateAccount();
    var ethereum_external = eth_ext[i];
    var last_name = donorLastNames[i];
    var company_name = "Company "+ donorLastNames[i].toString();
    var newDonor = {
      email: "donor" + (i+1).toString() + "@coreygarvey.com",
      password: "donor",
      password_verification: "donor",
      userType: {
        isStudent: false,
        isDonor: true,
        isUniAdmin: false,
      },
      name: {
        first: "Donor",
        last: last_name,
      },
      phone: "+44-5555-555555",
      address: {
        country: "UK",
        city: "London",
        street: "Exhibition Road",
        zipCode: "SW7 2AZ",
      },
      company_info: {
        company: company_name,
        position: "Employee",
      },
      age: (35+i),
      ethereum: '0x0b0be3d00a30095b38cb4838b355f83ed6693423',
    };
    var donorId = Accounts.createUser(newDonor);
    donorIds.push(donorId);
  }
  return donorIds;
}

function acceptStudents(studentIds, acceptedCount) {
  // Accept 3 students
  var acceptedStudentCount = acceptedCount;
  
  var acceptedStudentIds = [];
  for(i = 0; i < acceptedStudentCount; i++){
    var studentId = studentIds[i];
    Meteor.call('updateStatus', studentId, "accepted", function(error, result) {
      if(error) {
        console.log(error.reason);
      };
    });
    acceptedStudentIds.push(studentId);
  }
  return acceptedStudentIds;
}

function rejectStudents(studentIds, rejectedCount) {
  var studentCount = studentIds.length;

  var rejectedStudentCount = rejectedCount;
  var rejectedStudentIds = [];
  for(i=0; i < rejectedStudentCount; i++){
    var studentIndex = studentCount-i-1;
    var studentId = studentIds[studentIndex];

    Meteor.call('updateStatus', studentId, "rejected", function(error, result) {
      if(error) {
        console.log(error.reason);
      };
    });
    rejectedStudentIds.push(studentId);
  }

  console.log("RejectedStudents");
  console.log(rejectedStudentIds);
}

function donateMoney1(donorIds, studentIds){
  // Donate to all students
  // Donate to General pot
  // Donate to student 1 -> targetReached
  
  // get ids of studentand donor
  //tx1 =  student1, donor1, 0.16
  //tx2 = student1, donor2, 0.10
  //tx3 = student2, donor3, 0.15
  //tx4 = student3, donor1, 0.08
  //tx5 = GP, donor2, 0.10
  var donorIds = donorIds;
  console.log("donorIds");
  console.log(donorIds);
  
  // Student, Donor, Amount
  var transactions = [
    [1, 1, 0.16],
    [1, 2, 0.10],
    [2, 3, 0.15],
    [3, 1, 0.08],
    [0, 2, 0.10]
  ]

  var transactionCount = transactions.length;
  for(i=0; i < transactionCount; i++){
    var transaction = transactions[i];
    var idReceiver;
    var studentIndex = transaction[0]-1;
    

    var donorIndex = transaction[1]-1;
    var donorId = donorIds[donorIndex];
    var donorUser = Meteor.users.findOne({_id: donorId});
    var donorName = donorUser.name;

    var amount = transaction[2];
    // Donation to General Pot
    if(studentIndex < 0){
      var options = {
        type : "DtG",
        idSender: donorId,
        nameSender: donorName.first + " " + donorName.last,
        amount: amount,
      }
      Meteor.call('donatenow', options, function(error, result) {
        console.log("Entered Method Flag");

        if(error) {
          console.log("Error Flag");
          console.log(error.reason);
        }
        else {
          console.log("transaction done");
        }
      });
    } else {
      var studentId = studentIds[studentIndex];
      var studentUser = Meteor.users.findOne({_id: studentId});
      var studentName = studentUser.name;

      var options = {
        type : "DtS",
        idReceiver: studentId,
        nameReceiver: studentName.first + " " + studentName.last,
        idSender: donorId,
        nameSender: donorName.first + " " + donorName.last,
        amount: amount,
      }

      Meteor.setTimeout(function(){
        Meteor.call('createTransaction', options, function(error, result) {
          // What happens if methods function returns an error
          // +++++++++++++++++++++++++++++++++++++++++++++++++
          console.log("Entered Method Flag");

          if(error) {
            // display the error on the console log of the website
            console.log("Error Flag");
            console.log(error.reason);
            template.lastError.set(error.reason);
          }
          // What happens if methods function works fine
          else {
            console.log("transaction done");
          }
        });
      }, 4000);
      console.log("about to enter Target Checking");
      Meteor.call('checkTarget',studentId);
    }
  }
}
  
function acceptOpportunities() {
  var targetReachedStudents = Meteor.users.find({"uni_info.eStatus":"targetReached"});
  targetReachedStudents.forEach(function(student){
    var studentId = student._id;
    if(student.uni_info.eStatus == "targetReached"){
      Meteor.call('updateStatus', studentId, "acceptedOpportunity", function(error, result) {
        if(error) {
          // display the error on the console log of the website
          console.log(error.reason);
        };
      });
    }
  });
}  
    // Reallocation

    // Smart contract created

    // Fill smart contract

    // Forward smart contract    
    
    // 10 times
      // Money set into smart contract
      // Money forwarded to student account
    // All studying students graduate


  

function createStudents2() {
  // Create 4 students
  var studentNames = [
    ["Coline","Chabran"],
    ["Audrey", "Desvaux"],
    ["Lisette", "Groeneveld"],
    ["Sam", "Fiddis"],
    ["Corey", "Garvey"], 
    ["Jack","Tanner"]];
  var emails = [
    "coline.chabran@gmail.com",
    "audrey.desvaux@gmail.com",
    "lisette.groeneveld@gmail.com",
    "sam.fiddis@gmail.com",
    "corey.garvey@gmail.com",
    "jacktanner@gmail.com",
  ];
  var eth_ext = [
    "0x18bd045ffd606776494f00a7e2aff21d3341f777",
    "0x617704c1e7d7d213c299ad41ad90010150315c96",
    "0x93ee1010e6302b2b73a070ad638e579601b2ecaf",
    "0xe9475d5dd4b900e746cf671a5cd32cc599026266",
    "0x821e45e0dabb6a602fb09ecfa931e3f38da7fa8a",
    "0xd7cdab8d77a3e7dc19cecc6bf502e768dd7f780b"
    ];
  var uni = Universities.findOne({name: "Imperial College"});
  var uni_name = uni.name;
  var studentIds = [];
  for(i = 0; i < studentNames.length; i++){
    var myAddr = ethCreateAccount();
    var ethereum_external = eth_ext[i];
    var first_name = studentNames[i][0];
    var last_name = studentNames[i][1];
    var email = emails[i];
    var newStudent = {
      email: email,
      password: "student",
      password_verification: "student",
      userType: {
        isStudent: true,
        isDonor: false,
        isUniAdmin: false,
      },
      name: {
        first: first_name,
        last: last_name,
      },
      uni_info: {
        name: uni_name,
        uni: uni._id,
        program: "Msc of Computing Science",
        eStatus: "pending",
        tuition: 13500,
        tuition_eth: .125,
        allowance: 1256,
        allowance_eth: .0125,
        deadline: "Mid-August",
        payments_remaining: 10,
      },
      phone: "+44-5555-555555",
      address: {
        country: "UK",
        city: "London",
        street: "180 Queen's Gate",
        zipCode: "SW7 2AZ",
      },
      age: (22+i),
      allowance: true,
      ethereum_ext: ethereum_external,
      pledge: true,
      ethereum: myAddr,
    };
    var studentId = Accounts.createUser(newStudent);
    console.log("studentId");
    console.log(studentId);
    studentIds.push(studentId);
  }
}
    
function createDonors2() {
  // Create 3 donors
  var donorNames = [
    ["Fidellis","Perkonig"],
    ["Fariba", "Sadri"],
    ["Will", "Knottenbelt"]
    ];
  var emails = [
    "fidellis.perkonig@gmail.com",
    "fariba.sadri@gmail.com",
    "will.knottenbelt@gmail.com"
  ];
  var companies = [
    "Network Scaffolding",
    "Proof Consulting",
    "Blockchain Fencing"
  ];
  var eth_ext = [
    "0x18bd045ffd606776494f00a7e2aff21d3341f777",
    "0x617704c1e7d7d213c299ad41ad90010150315c96",
    "0x93ee1010e6302b2b73a070ad638e579601b2ecaf",
  ];
  var donorIds = [];
  var uni = Universities.findOne({name: "Imperial College"});
  var uni_name = uni.name;
  for(i = 0; i < donorNames.length; i++){
    var myAddr = ethCreateAccount();
    var ethereum_external = eth_ext[i];
    var first_name = donorNames[i][0];
    var last_name = donorNames[i][1];
    var email = emails[i]
    var company_name = companies[i];
    var newDonor = {
      email: email,
      password: "donor",
      password_verification: "donor",
      userType: {
        isStudent: false,
        isDonor: true,
        isUniAdmin: false,
      },
      name: {
        first: "Donor",
        last: last_name,
      },
      phone: "+44-5555-555555",
      address: {
        country: "UK",
        city: "London",
        street: "Exhibition Road",
        zipCode: "SW7 2AZ",
      },
      company_info: {
        company: company_name,
        position: "Founder and CEO",
      },
      age: (35+i),
      ethereum: '0x0b0be3d00a30095b38cb4838b355f83ed6693423',
    };
    var donorId = Accounts.createUser(newDonor);
    donorIds.push(donorId);
  }
}

function donateMoney2(){
  // Donate to all students
  // Donate to General pot
  // Donate to student 1 -> targetReached
  
  // get ids of studentand donor
  //tx1 =  student1, donor1, 0.16
  //tx2 = student1, donor2, 0.10
  //tx3 = student2, donor3, 0.15
  //tx4 = student3, donor1, 0.08
  //tx5 = GP, donor2, 0.10
  
  // Student, Donor, Amount
  var transactions = [
    [1, 1, 0.16],
    [1, 2, 0.10],
    [2, 3, 0.12],
    [2, 1, 0.05],
    [3, 1, 0.08],
    [3, 2, 0.06],
    [4, 2, 0.10],
    [5, 3, 0.08],
    [0, 3, 0.10]
  ]

  var transactionCount = transactions.length;
  for(i=0; i < transactionCount; i++){
    var transaction = transactions[i];
    var idReceiver;
    var studentIndex = transaction[0]-1;
    

    var donorIndex = transaction[1]-1;
    var donorId = donorIds[donorIndex];
    var donorUser = Meteor.users.findOne({_id: donorId});
    var donorName = donorUser.name;

    var amount = transaction[2];
    // Donation to General Pot
    if(studentIndex < 0){
      var options = {
        type : "DtG",
        idSender: donorId,
        nameSender: donorName.first + " " + donorName.last,
        amount: amount,
      }
      Meteor.call('donatenow', options, function(error, result) {
        console.log("Entered Method Flag");

        if(error) {
          console.log("Error Flag");
          console.log(error.reason);
        }
        else {
          console.log("transaction done");
        }
      });
    } else {
      var studentId = studentIds[studentIndex];
      var studentUser = Meteor.users.findOne({_id: studentId});
      var studentName = studentUser.name;

      var options = {
        type : "DtS",
        idReceiver: studentId,
        nameReceiver: studentName.first + " " + studentName.last,
        idSender: donorId,
        nameSender: donorName.first + " " + donorName.last,
        amount: amount,
      }

      Meteor.call('createTransaction', options, function(error, result) {
        // What happens if methods function returns an error
        // +++++++++++++++++++++++++++++++++++++++++++++++++
        console.log("Entered Method Flag");

        if(error) {
          // display the error on the console log of the website
          console.log("Error Flag");
          console.log(error.reason);
          template.lastError.set(error.reason);
        }
        // What happens if methods function works fine
        else {
          console.log("transaction done");
        }
      });
      
      console.log("about to enter Target Checking");
      Meteor.call('checkTarget',studentId);
    }
  }
}