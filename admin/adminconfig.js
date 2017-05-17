// Info for config file setup: https://github.com/sachinbhutani/flow-db-admin

AdminConfig = {

// Admin emails
adminEmails: ['saf16@ic.ac.uk','cmc16@ic.ac.uk','lhg16@ic.ac.uk','ahd216@ic.ac.uk','jnt16@ic.ac.uk', 'cg916@ic.ac.uk'],

// Define other collections to show here
collections:
{
},

// Below defines the fields that can be used for administration in user collection
userSchema: new SimpleSchema({

  "name.first": {
    type: String,
  },
  "name.middle": {
    type: String,
    optional: true,
  },
  "name.last": {
      type: String,
  },
  "userType.isStudent": {
    type: Boolean,
  },
  "userType.isDonor": {
    type: Boolean,
  },
  "userType.isUniAdmin": {
    type: Boolean,
  },
  age: {
    type: String,
  },
  phone: {
    type: String,
  },

  userType: {
    type: String,
  },

   "address.country": {
     type: String,
   },
   "address.city": {
     type: String,
   },
  "address.street": {
    type: String,
  },
  "address.zipCode": {
    type: String,
  },

  "uni_info.uni": {
    type: String,
  },
  "uni_info.program": {
    type: String,
  },
  "uni_info.eStatus": {
    type: String,
  },
})
}
