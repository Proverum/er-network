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
        const queryResult = await contract.evaluateTransaction('generateERSnapshot', 'collectionCitizenMunicipality');
        const resultString = queryResult.toString();
        const resultJSON = JSON.parse(resultString);

        let voter = resultJSON[0];
        let reportingMunicipality = voter.electoralAddress.reportingMunicipality;
        console.log(resultString);
        console.log(resultJSON);
        console.log(reportingMunicipality);


        const persistResult = await contract.submitTransaction('persistElectoralRegister', 'collectionERMunicipality', resultString);
        const resultStringPersist = persistResult.toString();
        const resultJSONPersist = JSON.parse(resultStringPersist);
        console.log(resultJSONPersist);

        //query the resulting hashes at last
        // const queryResult = await contract.evaluateTransaction('generateERSnapshot', 'collectionCitizenMunicipality');
        // const resultString = queryResult.toString();
        // const resultJSON = JSON.parse(resultString);



    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();
