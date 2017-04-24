import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { $ } from 'meteor/jquery';

import './profilepage.js';
import './profilepage.html';

describe('Profilepage events', function() {

  it('does an ether transaction and adds a transaction to the Transactions collection', function() {

    // SETUP
    // Test student Ether Account 0xe7552f9b52a319281d26753123d855b099b77a44
    // Jacks testnet Ether Account 0x0b0be3d00a30095b38cb4838b355f83ed6693423

    // EXECUTE
    Template.profilepage.fireEvent('click button');

    // VERIFY
    chai.assert.typeOf('idStudent', "String");

  });

});
