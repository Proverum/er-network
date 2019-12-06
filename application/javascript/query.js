/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', 'er-network', 'connection-confederation.json');
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

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet: wallet, identity: 'clerk1', discovery: { enabled: true, asLocalhost: true } });
        console.log("gateway options: ", gateway.getOptions());
        console.log("gateway itself: ", gateway);

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('federalchannel');    //daaaaa isch de fehler!
        console.log(network);

        // Get the contract from the network.
        const contract = network.getContract('testcc');
        console.log(contract);

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryMarks', 'Alice');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();
