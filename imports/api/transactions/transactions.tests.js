import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Transactions } from './transactions.js'

var assert = chai.assert;

describe('Transactions_test', function () {
  beforeEach(function () {
    resetDatabase();
  });
  it('builds correctly from factory', function () {

    const transaction = Factory.build('transaction');
    assert.typeOf(transaction, 'object');
    assert.typeOf(transaction.type, 'string' );
    assert.typeOf(transaction.idStudent, 'string');
    assert.typeOf(transaction.idDonor, 'string');
    assert.typeOf(transaction.amount, 'number');
    assert.typeOf(transaction.transactionHash, 'string');

  });
});
