//creat a transaction in the collection "transaction" of the database

Transactions.createTrans(function(options) {

if(options.type) {
  //check this  .insert ?
//  transaction.type = options.type;
}

// Add in contact field to user document (currently just phone)
if(options.idStudent) {
  //transaction.idStudent = options.idStudent;
}

// Add in address field to user document
if(options.idDonor) {
  //transaction.idDonor = options.idDonor;
}

// Add in age field to user document
if(options.amount) {
  transaction.amount = options.amount;
}

if(options.transactionHash) {
  transaction.transactionHash = options.transactionHash;
}
});
