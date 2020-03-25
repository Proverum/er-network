/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', '..', '..', 'er-network', 'connection-esp.json');

async function main() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(__dirname, 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('manager1');
        if (userExists) {
            console.log('An identity for the user "manager1" already exists in the wallet');
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists('admin');
        if (!adminExists) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();
        console.log("this is the ca pulled via the gateway", ca);

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({ affiliation: 'esp.divisionX', enrollmentID: 'manager1', role: 'client' }, adminIdentity);
        const enrollment = await ca.enroll({ enrollmentID: 'manager1', enrollmentSecret: secret });
        const userIdentity = X509WalletMixin.createIdentity('ESPMSP', enrollment.certificate, enrollment.key.toBytes());
        console.log("this is the newly enrolled user identity object", userIdentity);
        await wallet.import('manager1', userIdentity);
        console.log('Successfully registered and enrolled admin user "manager1" and imported it into the wallet for the esp');

    } catch (error) {
        console.error(`Failed to register user "manager1": ${error}`);
        process.exit(1);
    }
}

main();
