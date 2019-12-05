/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', 'er-network', 'connection-confederation.json');

async function main() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

              // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();
        console.log("the admin identity which is supposed to revoke identities: ", adminIdentity);

        // check what the remaining registered users are
        const identityService = ca.newIdentityService();
        let allIdentities = await identityService.getAll(adminIdentity);
        console.log("the remaining identities are:", allIdentities);
        console.log("these are the identities", allIdentities.result.identities);
        console.log("these are the identities[0]", allIdentities.result.identities[0]);

        await identityService.delete("clerk3", adminIdentity);
        await identityService.delete("clerk1", adminIdentity);

        let allIdentitiesUpdated = await identityService.getAll(adminIdentity);
        console.log("the remaining identities are:", allIdentities);
        console.log("these are the identities", allIdentities.result.identities);
        console.log("these are the identities[0]", allIdentities.result.identities[0]);


    } catch (error) {
        console.error(`Failed to delete clerks": ${error}`);
        process.exit(1);
    }
}

main();
