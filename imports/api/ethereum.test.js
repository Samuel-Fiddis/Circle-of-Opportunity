import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';

import './ethereum.js';

if (!(Meteor.isServer)) {
    describe('Ethereum function library', () => {

        // it('assert.equal(0, 0) ', function() {
        //     assert.equal(0, 0);
        // });

        describe('ethGetLatestBlock()', () => {
            it('return value > 0', () => {
                assert.equal(0, 0);
            });
        });

        describe('ethCreateAccount(password)', () => {
            it('return value > 0', () => {
                assert.equal(0, 0);
            });
        });
    })
}
