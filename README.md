# The Circle of Opportunity
Solving the problem of public mistrust in charities by operating all financial transactions on the Ethereum blockchain. The Circle of Opportunity provides aspiring students with donations to pay for tuition an living expenses, all completely transparent thanks to transactions occuring on the publically accessible Ethereum blockchain. Currently, the project is a proof of concept, running on an Ethereum testnet blockchain.

## Installation
#### Required software
* Meteor framework. Operating system specific instructions at [meteor.com/install](https://www.meteor.com/install)
* Geth Ethereum node manager. Operating system specific instructions at [ethereum.org/cli](https://www.ethereum.org/cli)

#### Setting up the Keystore
Currently in the Circle of Opportunity, all donor accounts are linked to a single Ethereum account. The general pot is also statically linked to an Ethereum account. To access these accounts, keystore files must be accessible by the Geth node. To do so, do the following:
1.	Open the circle-of-opportunity/ethereum folder
2.	Copy the following files 
	*UTC—2017-03-01T15-32-17.952349532Z--0b0be3d00a30095b38cb4838b355f83ed6693423*
	*UTC—2017-04-26T10-04-05.994243911Z--c08ee9c6252fb61271520dacac9a6126255bc81e*
3.	Paste these files into  ~/.ethereum/testnet/keystore


## Usage
### Server
#### Run geth
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

#### Run meteor
1. Clone the code base into your local machine (including the settings.json file)
```
git clone https://gitlab.doc.ic.ac.uk/g1653005/circle-of-opportunity.git
```
2. Open terminal in this directory
3. Download necessary packages with the following command:
```
meteor npm install
```
3. Run command: 
```
meteor run --settings settings.json
```

#### Testing Suite
1. Open a terminal in the circle-of-opportunity folder
2. Run command:
```
meteor test --driver-package practicalmeteor:mocha –port 4000
```
3. Open address in browser:
	localhost:4000


### Application
#### View Application
* Open address in browser:
	localhost:3000

#### University Administrator
A university user will automatically be created with the following credentials:
Email: *uni@uni.uni*
Password: *university*

* The university admin's profile is the interface for accepting or rejecting users after they have applied. 
* To accept a user
	* Navigate to "My Profile" when logged in as the University Admin 
	* Change the student's state to "Accepted"
	* This will allow donations to the student

#### Student
* Registering as a student will create a user within the Circle of Opportunity as well as an associated Ethereum account for the user. 
* To view the Ethereum account
	* Log in as the University Admin
	* Change the student's status to "Accepted"
	* Navigate to the student's profile page

#### Donor
* Registering as a donor will create a user within the Circle of Opportunity. 
* The donor's associated Ethereum account is currently a single account which as been loaded with Ether for making transactions.
* To donate to a student
	* Navigate to a student's profile for an Accepted student
	* Fill out the form.

#### Admin 
* Log in with the university user credentials
* Open address in browser:
	localhost:3000/admin
