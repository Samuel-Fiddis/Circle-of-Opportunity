import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';

import './etherscan.js';

describe('Etherscan API Functions', () => {

    it('assert.equal(0, 0) ', function() {
        assert.equal(0, 0);
    });


    it('etherscanAccountBalance(address)', () => {
      var value;
      value = etherscanAccountBalance("0x5097D17e4C8b2372Ae6082CEA32Ac7AFdFDE3c28");
      var expected = .46;
      var delta = expected * .05;
      assert.equal( (value + delta) > expected && (value - delta) < expected, true, "Value was within acceptable range");

      value = etherscanAccountBalance("0x5097D17e4C8b2a72Ae6082CEA32Ac7AFdFDE3c28");
      assert.equal(value, 0);

      value = etherscanAccountBalance("0x5097D17");
      assert.equal(value, false);

      value = etherscanAccountBalance(1);
      assert.equal(value, false);

      // value = etherscanAccountBalance("");
      // assert.throws(etherscanAccountBalance(""), "Address field is empty or invalid");

    });
})
