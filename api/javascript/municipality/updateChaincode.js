


'use strict';

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', '..', 'er-network', 'connection-municipality.json');

async function main() {
    try {

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        const client = await gateway.getClient();
        const peers = await client.getPeersForOrg('MunicipalityMSP');

        const knownchannel = await client.queryChannels(peers[0]);
        console.log(knownchannel);

        const network = await gateway.getNetwork('federalchannel');
        let channel = network.getChannel('federalchannel');
        let federalchannel = client.getChannel("federalchannel");
        console.log(federalchannel);

        // step 1: setup
        const mychaincode = client.newChaincode('publishcc', 'version2');
        const policy_def = {  };
        mychaincode.setEndorsementPolicyDefinition(policy_def);
        mychaincode.setSequence(2);

        // step 2: package
        // package the source code
        const package_request = {
           chaincodeType: 'node',
           chaincodePath: '../../../chaincode/result_publishing'
        }
        const cc_package = await mychaincode.package(package_request);


        // step 3: install
        const install_request = {
          target: peers[0],
          request_timeout: 10000 // give the peer some extra time
        }
        const package_id = await mychaincode.install(install_request);

        // step 4: approve
        const tx_id = client.newTransactionID();
        const requestApproval = {
           chaincode: mychaincode,
           txId: tx_id
        }
        const {proposalApproveResponses, proposalApprove} = await federalchannel.approveChaincodeForOrg(requestApproval);
        const orderer_request = {
           proposalResponses: proposalApproveResponses,
           proposal, proposalApprove
        }
        const resultsProposal = await federalchannel.sendTransaction(orderer_request);

        //step 5: commit
        const tx_id2 = client.newTransactionID();
        const requestCommit = {
           chaincode: mychaincode,
           txId: tx_id2
        }
        // send to the peers to be endorsed
        const {proposalResponsesCommit, proposalCommit} = await federalchannel.commitChaincode(requestCommit);
        const orderer_requestCommit = {
           proposalResponses: proposalResponsesCommit,
           proposal, proposalCommit
        }
        // send to the orderer to be committed
        const resultsCommit = await federalchannel.sendTransaction(orderer_requestCommit);

        // step 6: init
        const tx_id_3 = client.newTransactionID();
        const requestInit = {
           chaincodeId : chaincodeId,
           fcn: 'instantiate',
           args: [],
           txId: tx_id_3,
        }
        const init_results = await federalchannel.sendTransaction(requestInit, 20000);

        const orderer_requestInit = {
           proposalResponses: init_results[0],
           proposal: init_results[1]
        }
        const resultsFinal = await mychannel.sendTransaction(orderer_requestInit);
        console.log(resultsFinal);


    } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

    } finally {

        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

    }

}

main();
