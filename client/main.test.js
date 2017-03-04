import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';

describe('Ethereum Testing Functions', () => {
    it('assert.equal(0, 0) ', function() {
        assert.equal(0, 0);
    });

    it('assert.equal(0, 1)', function(){
      assert.equal(0, 1);
    });
})
