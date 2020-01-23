/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
var hash = require('object-hash');

const ccpPath = path.resolve(__dirname, '..', '..', '..', 'er-network', 'connection-municipality.json');
console.log(ccpPath);
async function main() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('clerk1');
        if (!userExists) {
            console.log('An identity for the user "clerk1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.3
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet: wallet, identity: 'clerk1', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('federalchannel');    //daaaaa isch de fehler!

        // Get the contract from the network.
        const contract = network.getContract('registercc');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('getAllCitizens', 'collectionERMunicipalityESP');
        const resultString = result.toString();
        const object = JSON.parse(resultString);
        //console.log(result.toString());
        //console.log(resultString);
        console.log(object);
        let voterList = object[0].Record;
        console.log(voterList);
        let voterListHash = hash(voterList);
        console.log(voterListHash);

        // Evaluate the specified transaction.
        const resultWorldState = await contract.evaluateTransaction('queryWorldState');
        const resultStringWorldState = resultWorldState.toString('utf8');
        const resultJSONWorldState = JSON.parse(resultStringWorldState);

        // console.log(resultWorldState);
        // console.log(resultStringWorldState);
        console.log(resultJSONWorldState);

        let publicVoterListHash = resultJSONWorldState[resultJSONWorldState.length-1];
        console.log(publicVoterListHash);
        console.log(publicVoterListHash.Record.contentHash);
        console.log(voterList);
        console.log(voterListHash);
        console.log(voterListHash==publicVoterListHash.Record.contentHash);

        //console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();
