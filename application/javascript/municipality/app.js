var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());// Setting for Hyperledger Fabric
const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');const ccpPath = path.resolve(__dirname, '..', '..', '..', 'er-network', 'connection-municipality.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);app.get('/api/queryallcars', async function (req, res) {
 // to be filled in
});

async function connectToGateway(){
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
  return gateway;
}

app.get('/api/municipality/querycitizen/:citizen_key', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();
      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!
      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('queryCitizen', 'collectionCitizenMunicipality', req.params.citizen_key);
      const resultString = result.toString('utf8');
      const resultJSON = JSON.parse(resultString);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      res.status(200).json({response: resultJSON});

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
  }
});

app.post('/api/municipality/addcitizen', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!
      // Get the contract from the network.
      const contract = network.getContract('registercc');
          // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
      console.log("submittes values:");
      console.log(req.body.vn, req.body.localPersonId, req.body.officialName, req.body.firstName, req.body.dateOfBirth, req.body.placeOfBirth,
        req.body.sex, req.body.religion, req.body.maritalStatus, req.body.nationality, req.body.originName, req.body.canton, req.body.residencePermit, req.body.reportingMunicipality,
        req.body.typeOfResidenceType, req.body.arrivalDate, req.body.street, req.body.postOfficeBoxText, req.body.city, req.body.swissZipCode, req.body.typeOfHousehold,
        req.body.collection, req.body.citizenKey);
      const registrationResponse = await contract.submitTransaction('addCitizen', req.body.vn, req.body.localPersonId, req.body.officialName, req.body.firstName, req.body.dateOfBirth, req.body.placeOfBirth,
        req.body.sex, req.body.religion, req.body.maritalStatus, req.body.nationality, req.body.originName, req.body.canton, req.body.residencePermit, req.body.reportingMunicipality,
        req.body.typeOfResidenceType, req.body.arrivalDate, req.body.street, req.body.postOfficeBoxText, req.body.city, req.body.swissZipCode, req.body.typeOfHousehold,
        req.body.collection, req.body.citizenKey);
      res.send('Transaction has been submitted', res.json({"result": "successfully added citizen", "body": req.body}));
      await gateway.disconnect();

    } catch (error) {
          console.error(`Failed to submit transaction: ${error}`);
          res.status(500).json({error: error});
      }
});

app.delete('/api/municipality/deletecitizen', async function (req, res) {
  try {
      //gateway defines the peers used to access Fabric networks
      const gateway = await connectToGateway();

      // Access er network
      console.log('Use network channel: erchannel.');
      const network = await gateway.getNetwork('erchannel');
      // Get the contract from the network.
      console.log('get contract: erchannel.');
      const contract = network.getContract('registercc');
      // delete citizen
      console.log('Submit delete citizen transaction.');
      const deletionResponse = await contract.submitTransaction('deleteCitizen', "collectionCitizenMunicipality", req.body.citizenKey);
      res.send('Transaction has been submitted', res.json({"result": "successfully deleted citizen", "body": req.body}));
      await gateway.disconnect();

    } catch (error) {
      console.error(`Failed to submit transaction: ${error}`);
      res.status(500).json({error: error});
   }
});


app.get('/api/municipality/queryallcitizens', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!

      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('getAllIdentities', 'collectionCitizenMunicipality');
      const resultString = result.toString('utf8');
      const resultJSON = JSON.parse(resultString);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      res.status(200).json({response: resultJSON});

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
  }
});

app.get('/api/municipality/queryallvoters', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!

      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('getAllIdentities', 'collectionERMunicipalityESP');
      const resultString = result.toString('utf8');
      const resultJSON = JSON.parse(resultString);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      res.status(200).json({response: resultJSON});

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
  }
});

app.get('/api/municipality/queryvoter/:voter_key', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!
      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('queryVoter', 'collectionERMunicipalityESP', req.params.voter_key);
      const resultString = result.toString('utf8');
      const resultJSON = JSON.parse(resultString);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      res.status(200).json({response: resultJSON});

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
  }
});

app.get('/api/municipality/queryvoterlist/:voterlist_key', async function (req, res) {
  try {

      // Create a new gateway for connecting to our peer node
      const gateway = await connectToGateway();

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!
      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('queryVoterList', 'collectionERMunicipalityESP', req.params.voterlist_key);
      const resultString = result.toString('utf8');
      const resultJSON = JSON.parse(resultString);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      res.status(200).json({response: resultJSON});

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
  }
});

app.get('/api/municipality/queryvoterhash/:voterhash_key', async function (req, res) {
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

app.get('/api/municipality/queryvoterlisthash/:voterlisthash_key', async function (req, res) {
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

app.get('/api/municipality/worldstate/erchannel', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');

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

app.put('/api/municipality/generateER', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!

      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const queryResult = await contract.evaluateTransaction('generateERSnapshot', 'collectionCitizenMunicipality');
      const resultString = queryResult.toString();
      const resultJSON = JSON.parse(resultString);

      console.log(queryResult);
      console.log(resultString);
      console.log(resultJSON);
      console.log("querying successful now saving the data to private data store...");

      const persistResult = await contract.submitTransaction('persistElectoralRegister', 'collectionERMunicipalityESP', resultString);
      const resultStringPersist = persistResult.toString();
      const resultJSONPersist = JSON.parse(resultStringPersist);
      console.log(`Transaction has been evaluated, result is: ${persistResult.toString()}`);
      res.status(200).json({response: resultJSON});
      console.log("finished generating electoral register... check corresponding private data collection for content");

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
  }
})

app.listen(8000);
