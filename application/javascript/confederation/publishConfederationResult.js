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

        let cantonResult;
        let cantonResult2;

        //wait for subordiante municpalities results
        await contract.addContractListener('confederation-canton-listener', 'cantonPublishMunicipalityEvent', (err, event, blockNumber, transactionId, status) => {
            if (err) {
              console.error(err);
              return;
            }

            //convert event to something we can parse
            result = event.payload.toString();
            result = JSON.parse(result);
            municipalityResult = result;

            //where we output the PublishEvent
            console.log('************************ Municipality Publish Event *******************************************************');
            console.log(`type: ${result.type}`);
            console.log(`votingid: ${result.votingid}`);
            console.log(`yes: ${result.yes}`);
            console.log(`no: ${result.no}`);
            console.log(`Block Number: ${blockNumber} Transaction ID: ${transactionId} Status: ${status}`);
            console.log('************************ End Municipality Publish Event ************************************');
        });

        await contract.addContractListener('confederation-canton2-listener', 'canton2PublishMunicipalityEvent', (err, event, blockNumber, transactionId, status) => {
            if (err) {
              console.error(err);
              return;
            }

            //convert event to something we can parse
            result = event.payload.toString();
            result = JSON.parse(result);
            municipality2Result = result;

            //where we output the TradeEvent
            console.log('************************ Municipality Publish Event *******************************************************');
            console.log(`type: ${result.type}`);
            console.log(`votingid: ${result.votingid}`);
            console.log(`yes: ${result.yes}`);
            console.log(`no: ${result.no}`);
            console.log(`Block Number: ${blockNumber} Transaction ID: ${transactionId} Status: ${status}`);
            console.log('************************ End Municipality Publish Event ************************************');
        });

        await contract.addContractListener('cantonal-municipality3-listener', 'municipality3PublishMunicipalityEvent', (err, event, blockNumber, transactionId, status) => {
            if (err) {
              console.error(err);
              return;
            }

            //convert event to something we can parse
            result = event.payload.toString();
            result = JSON.parse(result);
            municipality3Result = result;

            //where we output the TradeEvent
            console.log('************************ Municipality Publish Event *******************************************************');
            console.log(`type: ${result.type}`);
            console.log(`votingid: ${result.votingid}`);
            console.log(`yes: ${result.yes}`);
            console.log(`no: ${result.no}`);
            console.log(`Block Number: ${blockNumber} Transaction ID: ${transactionId} Status: ${status}`);
            console.log('************************ End Municipality Publish Event ************************************');
        });

        console.log(municipalityResult, municipality2Result, municipality3Result)

        if (municipalityResult && municipality2Result && municipality3Result) {
          // publish aggregated result
          let cantonalYesVotes = parseInt(municipalityResult.yes) + parseInt(municipality2Result.yes) + parseInt(municipality3Result.yes);
          let cantonalNoCVotes = parseInt(municipalityResult.no) + parseInt(municipality2Result.no) + parseInt(municipality3Result.no);
          console.log('Submit add citizen transaction.');
          const publishResponse = await contract.submitTransaction('publishCantonVotingResult', "UmverteilungExToTheTreme", cantonalYesVotes.toString(), cantonalNoVotes.toString());
          const publishResponseString = publishResponse.toString();
          const publishResponseJSON = JSON.parse(resultStringPersist);


          // process response
          console.log('Process issue transaction response. '+publishResponse);
          console.log(publishResponseJSON);

          console.log(` result key : ${publishResponse.key} successfully published for municipality `);
          console.log('Transaction complete.');
        }



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

})
