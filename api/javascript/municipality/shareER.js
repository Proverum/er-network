/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

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
        // Evaluate the specified transaction.
        const queryResult = await contract.evaluateTransaction('getAllCitizens', 'collectionERMunicipality');
        const resultString = queryResult.toString();
        const resultJSON = JSON.parse(resultString);

        console.log(queryResult);
        console.log(resultString);
        console.log(resultJSON);
        console.log("querying successful");
        //console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        const persistResult = await contract.submitTransaction('persistElectoralRegister', 'collectionERMunicipalityESP', resultString);
        const resultStringPersist = persistResult.toString();
        const resultJSONPersist = JSON.parse(resultStringPersist);
        console.log(resultJSONPersist);


    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();
