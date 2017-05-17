#The Circle of Opportunity
Solving the problem of public mistrust in charities by operating all financial transactions on the Ethereum blockchain. The Circle of Opportunity provides aspiring students with donations to pay for tuition an living expenses, all completely transparent thanks to transactions occuring on the publically accessible Ethereum blockchain. Currently, the project is a proof of concept, running on an Ethereum testnet blockchain.

##Installation
**Required software:**
 1.	Meteor framework. Operating system specific instructions at [meteor.com/install](https://www.meteor.com/install)
 2.	Geth Ethereum node manager. Operating system specific instructions at [ethereum.org/cli](https://www.ethereum.org/cli)

##Usage
####Run geth
The Circle of Opportunity creates transactions on the Ethereum blockchain. These transactions are published to the public blockchain from a local node where the server is running. In order to successfully make transactions, a node must be running on the same machine as the application on port 8545. The instructions below will make that happen.
 1.	Open terminal in folder ~/.ethereum/testnet
 2.	Run command in terminal: 
	```
	geth --testnet --fast --bootnodes "enode://20c9ad97c081d63397d7b685a412227a40e23c8bdc6688c6f37e97cfbc22d2b4d1db1510d8f61e6a8866ad7f0e17c02b14182d37ea7c3c8b9c2683aeb6b733a1@52.169.14.227:30303,enode://6ce05930c7 2abc632c58e2e4324f7c7ea478cec0ed4fa2528982cf34483094e9cbc9216e7aa349691242576d552a2a56aaeae426c5303ded677ce455ba1acd9d@13.84.180.240:30303"
	```
 3.	Wait for the geth node to synchronize to the latest block. This will take several hours on a fast machine and require 4-5Gb of space. At the end of this time, the number of blocks downloaded will change from several hundred to less than 5 blocks each update
 4.	Kill the geth process
 5.	Run command in terminal: 
 	```
 	geth --rpc --rpccorsdomain "http://localhost:3000" --rpcapi "db,eth,net,personal,web3" --testnet
 	```

#### Application Usage
#####University Administrator
A university user will automatically be created with the following credentials:
*Email:* uni@uni.uni
*Password:* university

* The university admin's profile is the interface for accepting or rejecting users after they have applied. 
* To accept a user
	* Navigate to "My Profile" when logged in as the University Admin 
	* Change the student's state to "Accepted"
	* This will open up the ability to donate to the student.

#####Student
* Registering as a student will create a user within the Circle of Opportunity as well as an associated Ethereum account for the user. 
* To view the Ethereum account
	* Log in as the University Admin
	* Change the student's status to "Accepted"
	* Navigate to the student's profile page

#####Donor
* Registering as a donor will create a user within the Circle of opportunity. 
* The donor's associated Ethereum account is currently a single account which as been loaded with Ether for making transactions.
* To donate to a student
	* Navigate to a student's profile for an Accepted student
	* Fill out the form.


####Setting up the Keystore
Circle of Opportunity currently has all donor accounts linked to a single Ethereum account that has been loaded with Ether. The general pot is also statically linked to a single Ethereum account. To access these accounts the following steps must be taken:
 1.	Open terminal in ~/.ethereum/testnet/keystore
 2.	Run the commands:

cat > UTC—2017-04-26T10-04-05.994243911Z—c08ee9c6252fb61271520dacac9a6126255bc81e

 “{"address":"c08ee9c6252fb61271520dacac9a6126255bc81e","crypto":{"cipher":"aes-128-ctr","ciphertext":"2ae695bd3bef3619149789ed0e49d634f6493312bbe0ae1d428f9a8664fcae18","cipherparams":{"iv":"af6d0d840082fa921882b3f7af2b5c8d"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"41611c470fb87909f6cd4911586dd9746fa2041405041c2abeb1cfeebd8bb1c4"},"mac":"bba9cb2009115a594c460e471fe6d5230a1c2c35595de2d715ae8e1deb506408"},"id":"37d0344f-3355-4cca-8079-cec1a0d0ba03","version":3}”

Ctrl + Z

cat > UTC—2017-03-01T15-32-17.952349532Z--0b0be3d00a30095b38cb4838b355f83ed6693423

“{"address":"0b0be3d00a30095b38cb4838b355f83ed6693423","crypto":{"cipher":"aes-128-ctr","ciphertext":"b360222bdd0ace688ec50d023b13f4ba3d6a1b735bf0457641f6df504f3bcef9","cipherparams":{"iv":"d032b7a1ca8bb7559b1a51813269ff6b"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"2cf87af182767c460eddf8d6517055e6f6295da52802645ebb11d163dd51efdd"},"mac":"35e576d77072f61bf2db49da462cc5b8955d18d5871a99b4f5319b4df6f04f21"},"id":"81b36bc5-febe-414e-9487-b96ca8623669","version":3}”

Ctrl + Z