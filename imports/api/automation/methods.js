import { Meteor } from 'meteor/meteor';
import { Universities } from '/imports/api/universities/universities.js';

Meteor.methods({

  cycleOne: function() {
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
    // Create 3 donors
    var donorCount = 3;
    var donorLastNames = ["One", "Two", "Three"];
    var donorIds = [];
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

    // Accept 3 students
    var rejectedStudentCount = 1;
    var acceptedStudentCount = studentCount-rejectedStudentCount;
    var rejectedStudentIds = [];
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

    // Reject 1 student
    for(i=0; i < rejectedStudentCount; i++){
      var studentIndex = studentCount-i-1;
      console.log("studentIndex");
      console.log(studentIndex);
      console.log("studentIds");
      console.log(studentIds);
      var studentId = studentIds[studentIndex];

      Meteor.call('updateStatus', studentId, "rejected", function(error, result) {
        if(error) {
          console.log(error.reason);
        };
      });
      rejectedStudentIds.push(studentId);
    }

    console.log("AcceptedStudents");
    console.log(acceptedStudentIds);
    console.log("RejectedStudents");
    console.log(rejectedStudentIds);

    // Donate to all students
    
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
        var studentUser = Meteor.users.findOne({_id: donorId});
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


    /*
    */


    // Donate to General pot
    // Donate to student 1 -> targetReached
    // Student 1 accepts, uni accepts, tuition paid
    // Reallocation
    // Smart contract created
    // 10 times
      // Money set into smart contract
      // Money forwarded to student account
    // All studying students graduate

  }
});
