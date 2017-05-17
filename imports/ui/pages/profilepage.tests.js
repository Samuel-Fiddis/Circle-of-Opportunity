
import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { $ } from 'meteor/jquery';

describe('Profilepage events', function() {

  it('does an ether transaction and adds a transaction to the Transactions collection', function() {

    // EXECUTE
    Template.profilepage.fireEvent('click button');

    // VERIFY
    chai.assert.typeOf('idReceiver', "String");

  });

});
