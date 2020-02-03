const fs = require('fs');
const path = require('path');
const { FileSystemWallet, Gateway } = require('fabric-network');
const ccpPath = path.resolve(__dirname, '..', '..', '..',  'er-network', 'connection-confederation.json');


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

        var cantonResult;
        var cantonResult2;

        //wait for subordiante canton results
        await contract.addContractListener('confederation-canton-listener', 'Canton:PublishCantonEvent', (err, event, blockNumber, transactionId, status) => {
            if (err) {
              console.error(err);
              return;
            }

            //convert event to something we can parse
            result = event.payload.toString();
            result = JSON.parse(result);
            cantonResult = result;

            //where we output the PublishEvent
            console.log('************************ Municipality Publish Event *******************************************************');
            console.log(`type: ${result.type}`);
            console.log(`votingid: ${result.votingid}`);
            console.log(`yes: ${result.yes}`);
            console.log(`no: ${result.no}`);
            console.log(`Block Number: ${blockNumber} Transaction ID: ${transactionId} Status: ${status}`);
            console.log('************************ End Municipality Publish Event ************************************');
        });

        await contract.addContractListener('confederation-canton2-listener', 'Canton2:PublishCantonEvent', (err, event, blockNumber, transactionId, status) => {
            if (err) {
              console.error(err);
              return;
            }

            //convert event to something we can parse
            result = event.payload.toString();
            result = JSON.parse(result);
            cantonResult2 = result;

            //where we output the TradeEvent
            console.log('************************ Municipality Publish Event *******************************************************');
            console.log(`type: ${result.type}`);
            console.log(`votingid: ${result.votingid}`);
            console.log(`yes: ${result.yes}`);
            console.log(`no: ${result.no}`);
            console.log(`Block Number: ${blockNumber} Transaction ID: ${transactionId} Status: ${status}`);
            console.log('************************ End Municipality Publish Event ************************************');
        });


        console.log(cantonResult, cantonResult2)

        if (cantonResult && cantonResult2) {
          // publish aggregated result
          let confederationalYesVotes = parseInt(cantonResult.yes) + parseInt(cantonResult2.yes);
          let confederationalNoCVotes = parseInt(cantonResult.no) + parseInt(cantonResult2.no);
          console.log('Submit add citizen transaction.');
          const publishResponse = await contract.submitTransaction('publishCantonVotingResult', "UmverteilungExToTheTreme", confederationalYesVotes.toString(), confederationalNoCVotes.toString());
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

    }
}
main().then(() => {

    console.log('Confederation Publish Result program complete.');

})
