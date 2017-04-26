// This defines a starting set of data to be loaded if the app is loaded with an empty db.
import './account-creation.js';

// This defines all the collections, publications and methods that the application provides
// as an API to the client.
import './register-api.js';

import '/imports/api/image_upload/server/publish.js';
import '/imports/api/users/helpers.js';

// Import email methods to be used on server
import '/imports/api/email/methods.js';


import '../../api/ethereum/ethereum.js';
import '../../api/ethereum/etherscan.js';

import '../../startup/server/ethereum.js';
