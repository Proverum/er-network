var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
var app = express();

app.use(bodyParser.json());// Setting for Hyperledger Fabric
app.use(cors());
const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');const ccpPath = path.resolve(__dirname, '..', '..', '..', 'er-network', 'connection-sp.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

async function connectToGateway(){
  const walletPath = path.join(__dirname, 'wallet');
  const wallet = new FileSystemWallet(walletPath);
  console.log(`Wallet path: ${walletPath}`);

  // Check to see if we've already enrolled the user.
  const userExists = await wallet.exists('manager1');
  if (!userExists) {
      console.log('An identity for the user "manager1" does not exist in the wallet');
      console.log('Run the registerUser.js application before retrying');
      return;
  }
  // Create a new gateway for connecting to our peer node.3
  const gateway = new Gateway();
  await gateway.connect(ccpPath, { wallet: wallet, identity: 'manager1', discovery: { enabled: true, asLocalhost: true } });
  return gateway;
}

app.get('/api/sp/queryallvoters', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!

      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('getAllVoters', 'collectionERMunicipalityTwoESP');
      const resultString = result.toString('utf8');
      const resultJSON = JSON.parse(resultString);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      res.status(200).json({response: resultJSON});

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
  }
});

app.get('/api/sp/queryvoter/:voter_key', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!
      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('queryVoter', 'collectionERMunicipalityTwoESP', req.params.voter_key);
      const resultString = result.toString('utf8');
      const resultJSON = JSON.parse(resultString);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      res.status(200).json({response: resultJSON});

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
  }
});

app.get('/api/sp/queryvoterlist/:voterlist_key', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node
      const gateway = await connectToGateway();

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!
      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('queryVoterList', 'collectionERMunicipalityTwoESP', req.params.voterlist_key);
      const resultString = result.toString('utf8');
      const resultJSON = JSON.parse(resultString);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      res.status(200).json({response: resultJSON});

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
  }
});

app.get('/api/sp/queryvoterhash/:voterhash_key', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!
      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('queryVoterHash', req.params.voterhash_key);
      const resultString = result.toString('utf8');
      const resultJSON = JSON.parse(resultString);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      res.status(200).json({response: resultJSON});

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
  }
});

app.get('/api/sp/queryvoterlisthash/:voterlisthash_key', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!
      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('queryVoterListHash', req.params.voterlisthash_key);
      const resultString = result.toString('utf8');
      const resultJSON = JSON.parse(resultString);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      res.status(200).json({response: resultJSON});

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
  }
});

app.get('/api/sp/worldstate/:channelname', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork(req.params.channelname);

      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('queryWorldState');
      const resultString = result.toString('utf8');
      const resultJSON = JSON.parse(resultString);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      res.status(200).json({response: resultJSON});


  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
  }
})

app.post('/api/sp/generateER', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();
      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!

      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const queryResult = await contract.evaluateTransaction('generateERSnapshot', 'collectionCitizenMunicipalityTwo');
      const resultString = queryResult.toString();
      const resultJSON = JSON.parse(resultString);

      console.log(queryResult);
      console.log(resultString);
      console.log(resultJSON);
      console.log("querying successful now saving the data to private data store...");

      const persistResult = await contract.submitTransaction('persistElectoralRegister', 'collectionERMunicipalityTwoESP', resultString);
      const resultStringPersist = persistResult.toString();
      const resultJSONPersist = JSON.parse(resultStringPersist);
      console.log(`Transaction has been evaluated, result is: ${persistResult.toString()}`);
      res.status(200).json({response: resultJSONPersist});
      console.log("finished generating electoral register... check corresponding private data collection for content");

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
  }
})


app.listen(8080);
