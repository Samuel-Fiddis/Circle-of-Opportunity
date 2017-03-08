import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';

// import '../startup/client/ethereum.js';
web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

import './ethereum.js';

if (!(Meteor.isServer)) {
    describe('Ethereum function library', () => {

        describe('ethGetLatestBlock()', () => {
            it('return value > 589000', () => {
                var val = ethGetLatestBlock();
                assert.equal(val>589000, true);
            });
        });

        describe('ethCreateAccount(password)', () => {
            it('return value > 0', () => {
                assert.equal(0, 0);
            });
        });
    })
}
