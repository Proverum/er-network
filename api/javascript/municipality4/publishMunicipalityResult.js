const fs = require('fs');
const path = require('path');
const { FileSystemWallet, Gateway } = require('fabric-network');
const ccpPath = path.resolve(__dirname, '..', '..', '..',  'er-network', 'connection-municipality.json');


// Main program function
async function main() {

    // Main try/catch block
    try {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('clerk1');
        if (!userExists) {
            console.log('An identity for the user "clerk1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        // A gateway defines the peers used to access Fabric networks
        const gateway = new Gateway();

        // Connect to gateway using application specified parameters
        console.log('Connect to Fabric gateway.');
        await gateway.connect(ccpPath, { wallet, identity: 'clerk1', discovery: { enabled: true, asLocalhost: true } });

        // Access PaperNet network
        console.log('Use network channel: federalchannel.');
        const network = await gateway.getNetwork('cantonchannel');

        // Get the contract from the network.
        console.log('get contract: federalchannel.');
        const contract = network.getContract('publishcc');

        // register citizen
        console.log('Submit publish municipality result transaction.');
        const publishResponse = await contract.submitTransaction('publishMunicipalityVotingResult', "Municipality", "Umverteilung30", "234234", "1231");
        const publishResponseString = publishResponse.toString();
        const publishResponseJSON = JSON.parse(publishResponseString);


        // process response
        console.log('Process issue transaction response. '+publishResponse);
        console.log(publishResponseJSON);

        console.log(` result key : ${publishResponse.key} successfully published for municipality `);
        console.log('Transaction complete.');


    } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

    }
}
main().then(() => {

    console.log('Publish municipal results program complete.');
    process.exit();

})
