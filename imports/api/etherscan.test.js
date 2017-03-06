import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';

import './etherscan.js';

describe('Etherscan API Functions', () => {
    it('assert.equal(0, 0) ', function() {
        assert.equal(0, 0);
    });

    it('Etherscan account balance lookup', () => {
      var value;
      value = etherscanAccountBalance();

      var expected = .46;
      var delta = expected * .1;
      assert.equal( (value + delta) > expected && (value - delta) < expected, true, "Value was within acceptable range");

    });
})
