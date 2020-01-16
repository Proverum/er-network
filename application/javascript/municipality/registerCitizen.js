const fs = require('fs');
const path = require('path');
const { FileSystemWallet, Gateway } = require('fabric-network');
const Citizen = require('../../../chaincode/register_management/lib/citizen.js');
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
        const network = await gateway.getNetwork('federalchannel');

        // Get the contract from the network.
        console.log('get contract: federalchannel.');
        const contract = network.getContract('registercc');

        // register citizen
        console.log('Submit add citizen transaction.');
        const registrationResponse = await contract.submitTransaction('addCitizen', "test.5544.2948.02", "CH.VERA.263453", "Schwab", "Lena", "26.03.82", "Altdorf", "weiblich",
          "israelitische Gemeinschaft / jüdische Glaubensgemeinschaft", "verheiratet", "Schweiz", "Altdorf", "Uri", "na",
          "TestCityExtraAdd", "Hauptwohnsitz", "09.08.2015", "Usterstrasse 9b", "192", "Wallisellen", "8304", "Privathaushalt", "collectionCitizenMunicipality","CITIZENX");

        // process response
        console.log('Process issue transaction response. '+registrationResponse);


        console.log(` citizen key : ${registrationResponse.key} successfully registred for municipality `);
        console.log('Transaction complete.');


    } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

    } finally {

        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

    }
}
main().then(() => {

    console.log('Issue program complete.');

}).catch((e) => {

    console.log('Issue program exception.');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);

});
