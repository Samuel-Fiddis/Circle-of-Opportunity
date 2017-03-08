import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';

import './etherscan.js';

if (!(Meteor.isServer)) {
    describe('Etherscan API Functions', () => {

        describe('etherscanAccountBalance(address)', () => {
            it('valid account with balance .46', () => {
                var value;
                value = etherscanAccountBalance("0x5097D17e4C8b2372Ae6082CEA32Ac7AFdFDE3c28");
                var expected = .46;
                var delta = expected * .05;
                assert.equal( (value + delta) > expected && (value - delta) < expected, true, "Value was within acceptable range");
            });

            it('valid account with balance 0.0', () => {
                var value;
                value = etherscanAccountBalance("0x5097D17e4C8b2a72Ae6082CEA32Ac7AFdFDE3c28");
                assert.equal(value, 0);
            });

            it('invalid account - address too short', () => {
                var value;
                value = etherscanAccountBalance("0x5097D17");
                assert.equal(value, false);
            });

            it('invalid input argument(1)', () => {
                var value;
                value = etherscanAccountBalance(1);
                assert.equal(value, false);
            });

            // it('invalid input arguments - empty string', () => {
            //     var value;
            //     value = etherscanAccountBalance("");
            //     assert.throws(etherscanAccountBalance(""), "Address field is empty or invalid");
            // });
        });

        describe('jsonValueGet(url, key)', () => {
            it('valid url and key', () => {
                var value;
                value = jsonValueGet("https://testnet.etherscan.io/api?module=account&action=balance&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&tag=latest&apikey=YourApiKeyToken", "message");
                assert.equal( value, "OK");
            });
        });
    })
}
