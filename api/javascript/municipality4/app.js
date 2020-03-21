var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
var app = express();

app.use(bodyParser.json());// Setting for Hyperledger Fabric
app.use(cors());
const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');const ccpPath = path.resolve(__dirname, '..', '..', '..', 'er-network', 'connection-municipality4.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

async function connectToGateway(){
  const walletPath = path.join(__dirname, 'wallet');
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

app.get('/api/municipality4/querycitizen/:citizen_key', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();
      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!
      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('queryCitizen', 'collectionCitizenMunicipalityFour', req.params.citizen_key);
      const resultString = result.toString('utf8');
      const resultJSON = JSON.parse(resultString);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      res.status(200).json({response: resultJSON});

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
  }
});

app.post('/api/municipality4/addcitizen', async function (req, res) {
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
      res.status(200).json({response: req.body});
      await gateway.disconnect();

    } catch (error) {
          console.error(`Failed to submit transaction: ${error}`);
          res.status(500).json({error: error});
      }
});

app.post('/api/municipality4/publishresult', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!
      // Get the contract from the network.
      const contract = network.getContract('registercc');
          // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
      console.log("submittes values:");
      console.log(req.body.vn, req.body.localPersonId, req.body.officialName, );
      const registrationResponse = await contract.submitTransaction('publish result', req.body.vn, req.body.localPersonId, req.body.officialName);
      res.status(200).json({response: req.body});
      await gateway.disconnect();

    } catch (error) {
          console.error(`Failed to submit transaction: ${error}`);
          res.status(500).json({error: error});
      }
});

app.delete('/api/municipality4/deletecitizen/:citizen_key', async function (req, res) {
  try {
      //gateway defines the peers used to access Fabric networks
      const gateway = await connectToGateway();

      // Access er network
      const network = await gateway.getNetwork('erchannel');
      // Get the contract from the network.
      const contract = network.getContract('registercc');
      // delete citizen
      console.log('Submit delete citizen transaction.');
      const deletionResponse = await contract.submitTransaction('deleteCitizen', "collectionCitizenMunicipalityFour", req.params.citizen_key);
      res.status(200).json({response: "succesfully deleted citizen"});
      await gateway.disconnect();

    } catch (error) {
      console.error(`Failed to submit transaction: ${error}`);
      res.status(500).json({error: error});
   }
});


app.get('/api/municipality4/queryallcitizens', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!

      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('getAllCitizens', 'collectionCitizenMunicipalityFour');
      const resultString = result.toString('utf8');
      const resultJSON = JSON.parse(resultString);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      res.status(200).json({response: resultJSON});

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
  }
});

app.get('/api/municipality4/queryallvoters', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!

      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('getAllVoters', 'collectionERMunicipalityFourESP');
      const resultString = result.toString('utf8');
      const resultJSON = JSON.parse(resultString);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      res.status(200).json({response: resultJSON});

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
  }
});

app.get('/api/municipality4/querytransit/:collection_name', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!

      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('getAllCitizens', req.params.collection_name);
      const resultString = result.toString('utf8');
      const resultJSON = JSON.parse(resultString);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      res.status(200).json({response: resultJSON});

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
  }
});

app.get('/api/municipality4/queryvoter/:voter_key', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!
      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('queryVoter', 'collectionERMunicipalityFourESP', req.params.voter_key);
      const resultString = result.toString('utf8');
      const resultJSON = JSON.parse(resultString);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      res.status(200).json({response: resultJSON});

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
  }
});

app.get('/api/municipality4/queryvoterlist/:voterlist_key', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node
      const gateway = await connectToGateway();

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!
      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('queryVoterList', 'collectionERMunicipalityFourESP', req.params.voterlist_key);
      const resultString = result.toString('utf8');
      const resultJSON = JSON.parse(resultString);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      res.status(200).json({response: resultJSON});

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
  }
});

app.get('/api/municipality4/queryvoterhash/:voterhash_key', async function (req, res) {
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

app.get('/api/municipality4/queryvoterlisthash/:voterlisthash_key', async function (req, res) {
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

app.get('/api/municipality4/worldstate/:channelname', async function (req, res) {
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

app.post('/api/municipality4/generateER', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.3
      const gateway = await connectToGateway();
      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!

      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const queryResult = await contract.evaluateTransaction('generateERSnapshot', 'collectionCitizenMunicipalityFour');
      const resultString = queryResult.toString();
      const resultJSON = JSON.parse(resultString);

      console.log(queryResult);
      console.log(resultString);
      console.log(resultJSON);
      console.log("querying successful now saving the data to private data store...");

      const persistResult = await contract.submitTransaction('persistElectoralRegister', 'collectionERMunicipalityFourESP', resultString);
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

app.listen(8030);
