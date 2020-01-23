// Create a new gateway for connecting to our peer node.
const gateway = new Gateway();
await gateway.connect(ccp, { wallet, identity: 'xxxx' });

const client = gateway.getClient();
const peers = client.getPeersForOrg('PeerMSP');

let installResponse = await client.installChaincode({
    targets: peers,
    chaincodePath: '/path/to/chaincode',
    chaincodeId: 'chaincode',
    chaincodeVersion: '0.0.2',
    chaincodeType: 'node',
    channelNames: ['mychannel']
});

let channel = client.getChannel('mychannel');

let proposalResponse = await channel.sendUpgradeProposal({
    targets: peers,
    chaincodeType: 'node',
    chaincodeId: 'chaincode',
    chaincodeVersion: '0.0.2',
    args: ['test'],
    fcn: 'instantiate',
    txId: client.newTransactionID()
});

console.log(proposalResponse);

console.log('Sending the Transaction ..');
const transactionResponse = await channel.sendTransaction({
    proposalResponses: proposalResponse[0],
    proposal: proposalResponse[1]
});

console.log(transactionResponse);
