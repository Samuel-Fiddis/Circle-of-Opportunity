import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

//import './studentoverview.html';
import './studentView.html';



// *****************************************************************************
// What happens when you create the template
// *****************************************************************************

// OnCreated function for the template --> is run when page is rendered
// --------------------------------------------------------------------

Template.studentView.onCreated( function() {

  // subscribe to universities publication: returns all documents in Universities
  this.subscribe('universities');


});


// *****************************************************************************
// Template level Helpers
// *****************************************************************************

Template.studentView.helpers({

  // studentoverView Helper to pass on ethereum information based on public key
  // --------------------------------------------------------------------------

  balance : function (){
    var myEthAddr = this.ethereum;
    return ethGetBalance(myEthAddr);
  },


})
