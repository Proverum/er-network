
'use strict';

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', '..', 'er-network', 'connection-canton2.json');

async function main() {
    try {

        const walletPath = path.join(__dirname, 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();
        console.log("this is the admin user", adminIdentity);
        const affiliationService = ca.newAffiliationService()
        console.log("this is the affiliationService", affiliationService);

        let allAffiliations = await affiliationService.getAll(adminIdentity);
        console.log("these are the affiliations", allAffiliations);
        console.log("these are the affiliations[0]", allAffiliations.result.affiliations[0]);
        console.log("these are the affiliations[1]", allAffiliations.result.affiliations[1]);
        const affiliationX = await affiliationService.create({name: "canton2.amtX", force: true}, adminIdentity);
        const affiliationY = await affiliationService.create({name: "canton2.amtY", force: true}, adminIdentity);
        const affiliationZ = await affiliationService.create({name: "canton2.amtZ", force: true}, adminIdentity);
        let allAffiliationsUpdated = await affiliationService.getAll(adminIdentity);
        console.log("these are the all updated affiliations", allAffiliationsUpdated);
        let finalAffiliations = await affiliationService.getAll(adminIdentity);
        console.log("these are the final affiliations[0]", finalAffiliations.result.affiliations);


    } catch (error) {
        console.error(`Failed to query affiliations as admin ${error}`);
        process.exit(1);
    }
}

main();
