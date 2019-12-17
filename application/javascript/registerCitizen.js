const fs = require('fs');
const { FileSystemWallet, Gateway } = require('fabric-network');
const Citizen = require('../../chaincode/register_management/lib/citizen.js');
const ccpPath = path.resolve(__dirname, '..', '..', 'er-network', 'connection-confederation.json');


// Main program function
async function main() {

    // Main try/catch block
    try {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('clerk1');
        if (userExists) {
            console.log('An identity for the user "clerk1" already exists in the wallet');
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
        const contract = network.getContract('registerManagement', 'er-network.registermanagementcontract');

        // register citizen
        console.log('Submit commercial paper issue transaction.');
        const registrationResponse = await contract.submitTransaction('registerCitizen', '897034539-concord', 'citizen12387', 'Zug',
        '342-Zg-234', '2509091-flat1', 'Müller', 'Michael', 'Baarerstrasse 20',
        '20.04.1990', 'Baar',
        'male', 'unmarried', 'catholic', 'swiss', 'na', 'resident',
        'Zug', 'na', 'na', 'Swiss, Zug, Zug', 'na');

        // process response
        console.log('Process issue transaction response.'+registrationResponse);

        let citizen = Citizen.fromBuffer(registrationResponse);

        console.log(`${citizen.name} citizen name : ${paper.} successfully registred for municipality ${citizen.municipality}`);
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
