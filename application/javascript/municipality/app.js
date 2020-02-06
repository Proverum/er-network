var express = require('express');
var bodyParser = require('body-parser');var app = express();

app.use(bodyParser.json());// Setting for Hyperledger Fabric
const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');const ccpPath = path.resolve(__dirname, '..', '..', '..', 'er-network', 'connection-municipality.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);app.get('/api/queryallcars', async function (req, res) {
 // to be filled in
});

app.get('/api/querycitizen/:citizen_index', async function (req, res) {
  try {

      // Create a new file system based wallet for managing identities.
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

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!

      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('queryCitizen', 'collectionCitizenMunicipality', req.params.citizen_index);
      const resultString = result.toString('utf8');
      const resultJSON = JSON.parse(resultString);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      res.status(200).json({response: result.toString()});

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
      process.exit(1);
  }
});

app.get('/api/queryallcitizens', async function (req, res) {
  try {

      // Create a new file system based wallet for managing identities.
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

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('erchannel');    //daaaaa isch de fehler!

      // Get the contract from the network.
      const contract = network.getContract('registercc');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('getAllCitizens', 'collectionCitizenMunicipality');
      const resultString = result.toString('utf8');
      const resultJSON = JSON.parse(resultString);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      res.status(200).json({response: result.toString()});

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
      process.exit(1);
  }
});

app.post('/api/addcar/', async function (req, res) {
 // to be filled in
})

app.put('/api/changeowner/:car_index', async function (req, res) {
 // to be filled in
})

app.listen(8080);
