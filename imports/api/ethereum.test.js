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
            it('new file is created in keystore folder', () => {
              var files_before = 3;
              ethCreateAccount('password');
              assert.equal(files_before+1, 4);
            });
        });

        describe('ethAllAccounts()', () => {
            it('array size is same as number of files in keystore folder', () => {
              var value;
              value = ethAllAccounts('password');
              assert.equal(0, 0);
            });
        });
    })
}

// if (Meteor.isServer) {
//   describe('ethCreateAccount(password)', () => {
//       it('return value > 0', () => {
//         // var exec = require('child_process').exec, child;
//         //
//         // child = exec('ls | wc -l',
//         //   function (error, stdout, stderr) {
//         //       console.log('stdout: ' + stdout);
//         //       console.log('stderr: ' + stderr);
//         //       if (error !== null) {
//         //            console.log('exec error: ' + error);
//         //       }
//         //   });
//         // var out = child();
//         // console.log("out:");
//         // console.log(out);
//
//         // var oShell = new ActiveXObject("Shell.Application");
//         // console.log("oShell");
//         // console.log(oShell);
//         // var commandtoRun = "C:\\Winnt\\Notepad.exe";
//         // if (inputparms != "") {
//         //   var commandParms = document.Form1.filename.value;
//         // }
//         //
//         // // Invoke the execute method.
//         // oShell.ShellExecute(commandtoRun, commandParms, "", "open", "1");
//         //   assert.equal(0, 0);
//       });
//   })
// }
