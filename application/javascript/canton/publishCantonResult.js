const fs = require('fs');
const path = require('path');
const { FileSystemWallet, Gateway } = require('fabric-network');
const ccpPath = path.resolve(__dirname, '..', '..', '..',  'er-network', 'connection-canton.json');


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
        const contract = network.getContract('publishcc');

        let result1;
        let result2;
        let result3;
        //wait for subordiante municpalities results
        await contract.addContractListener('cantonal-municipality-listener', 'Municipality:PublishMunicipalityEvent', (err, event, blockNumber, transactionId, status) => {
            if (err) {
              console.error(err);
              return;
            }

            //convert event to something we can parse
            result = event.payload.toString();
            result = JSON.parse(result);
            result1 = result;

            //where we output the PublishEvent
            console.log('************************ Municipality Publish Event *******************************************************');
            console.log(`type: ${result.type}`);
            console.log(`votingid: ${result.votingId}`);
            console.log(`yes: ${result.yes}`);
            console.log(`no: ${result.no}`);
            console.log(`Block Number: ${blockNumber} Transaction ID: ${transactionId} Status: ${status}`);
            console.log('************************ End Municipality Publish Event ************************************');
        });

        await contract.addContractListener('cantonal-municipality2-listener', 'Municipality2:PublishMunicipalityEvent', (err, event, blockNumber, transactionId, status) => {
            if (err) {
              console.error(err);
              return;
            }

            //convert event to something we can parse
            result = event.payload.toString();
            result = JSON.parse(result);
            result2 = result;

            //where we output the TradeEvent
            console.log('************************ Municipality Publish Event *******************************************************');
            console.log(`type: ${result.type}`);
            console.log(`votingid: ${result.votingId}`);
            console.log(`yes: ${result.yes}`);
            console.log(`no: ${result.no}`);
            console.log(`Block Number: ${blockNumber} Transaction ID: ${transactionId} Status: ${status}`);
            console.log('************************ End Municipality Publish Event ************************************');
        });

        await contract.addContractListener('cantonal-municipality3-listener', 'Municipality3:PublishMunicipalityEvent', (err, event, blockNumber, transactionId, status) => {
            if (err) {
              console.error(err);
              return;
            }

            //convert event to something we can parse
            result = event.payload.toString();
            result = JSON.parse(result);
            result3 = result;

            //where we output the TradeEvent
            console.log('************************ Municipality Publish Event *******************************************************');
            console.log(`type: ${result.type}`);
            console.log(`votingid: ${result.votingId}`);
            console.log(`yes: ${result.yes}`);
            console.log(`no: ${result.no}`);
            console.log(`Block Number: ${blockNumber} Transaction ID: ${transactionId} Status: ${status}`);
            console.log('************************ End Municipality Publish Event ************************************');
        });

        let published = false;
        while (published == false) {
          if (result1 && result2 && result3) {
            // publish aggregated result
            let cantonalYesVotes = parseInt(result1.yes) + parseInt(result2.yes) + parseInt(result3.yes);
            let cantonalNoVotes = parseInt(result1.no) + parseInt(result2.no) + parseInt(result3.no);
            console.log('Submit add citizen transaction.');
            const publishResponse = await contract.submitTransaction('publishCantonVotingResult', "Umverteilung30", cantonalYesVotes.toString(), cantonalNoVotes.toString());
            const publishResponseString = publishResponse.toString();
            const publishResponseJSON = JSON.parse(publishResponseString);

            published = true;
            // process response
            console.log('Process issue transaction response. '+publishResponse);
            console.log(publishResponseJSON);

            console.log(` result key : ${publishResponse.key} successfully published for canton `);
            console.log('Transaction complete.');
          }
          await timer(5000);
          console.log("waiting for the subordinate municipality results", result1, result2, result3);

        }


        function timer(ms) {
         return new Promise(res => setTimeout(res, ms));
        }



    } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

    }
}
main().then(() => {

    console.log('Publish cantonal results program complete.');
    process.exit();

})
