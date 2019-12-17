const { Contract, Context } = require('fabric-contract-api');

const Citizen = require('./citizen.js');
const CitizenRegistry = require('./CitizenRegistry.js');

class RegisterContext extends Context {

    constructor() {
        super();
        // All citizens are held in a the citizen registry
        this.citizenRegistry = new CitizenRegistry(this);
    }

}

class RegisterManagementContract extends Contract {

  constructor() {
        // Unique name when multiple contracts per chaincode file
        super('er-network.registermanagementcontract');
    }

  async instantiate(ctx) {
        // No implementation required with this example
        // It could be where data migration is performed, if necessary
        console.log('Instantiate the contract');
  }

  createContext() {
        return new RegistryContext();
  }

  async initLedger(ctx) {
    console.info('============= START : Initialize Ledger ===========');
    //some dummy citizens to work with
    const citizens = [
        {
            insuranceNr: '917-586-987',
            municipality: 'Zürich',
            buildingIdentificationNr: '666',
            flatIdentificationNr: '666-666',
            familyName: 'Iten',
            name: 'Randy',
            address: 'Rämistrasse 80',
            birthdate: '01.01-2000',
            hometown: 'Zürich',
            gender: 'male',
            civilStatus: 'unmarried',
            religion: 'catholic',
            citizenship: 'swiss',
            foreignIdentification: 'na',
            residencyStatus: 'recident',
            residencyMunicipality: 'Zürich',
            moveInInfo: '01.01.2017',
            moveOutInfo: 'na',
            votingRights: 'Switzerland, Zürich, Zürich',
            deathDate: 'na',

        },
        {
            insuranceNr: '565-123-785',
            municipality: 'Zollikon',
            buildingIdentificationNr: '666-123-ZH',
            flatIdentificationNr: '12-34-56',
            familyName: 'Bärtschi',
            name: 'sandra',
            address: 'Wilerstrasse 200',
            birthdate: '02-08.1978',
            hometown: 'Wil',
            gender: 'female',
            civilStatus: 'married',
            religion: 'protestant',
            citizenship: 'swiss',
            foreignIdentification: 'na',
            residencyStatus: 'visitor',
            residencyMunicipality: 'Zug',
            moveInInfo: '20.02.2005',
            moveOutInfo: 'na',
            votingRights: 'Switzerland, Zürich, Wil',
            deathDate: 'na',
        },
    ];

    for (let i = 0; i < citizens.length; i++) {
        citizens[i].docType = 'citizen';
        await ctx.stub.putState('CITIZEN' + i, Buffer.from(JSON.stringify(citizens[i])));
        console.info('Added <--> ', citizens[i]);
    }
    console.info('============= END : Initialize Ledger ===========');
  }

  async queryCitizen(ctx, citizenNumber) {
    // create an instance of the paper
    let paper = CommercialPaper.createInstance(issuer, paperNumber, issueDateTime, maturityDateTime, faceValue);

    // Add the paper to the list of all similar commercial papers in the ledger world state
    await ctx.paperList.addPaper(paper);

    // Must return a serialized paper to caller of smart contract
    return paper.toBuffer();
  }

  async registerCitizen(ctx, insuranceNr, citizenNumber, municipality,
     buildingIdentificationNr, flatIdentificationNr, familyName, name, address,
     birthdate, hometown,
     gender, civilStatus, religion, citizenship, foreignIdentification, residencyStatus,
     residencyMunicipality, moveInInfo, moveOutInfo, votingRights, deathDate) {
    // create an instance of the paper
    let citizen = Citizen.createInstance(personData, hasMainResidence, hasSecondaryResidence, hasOtherResidence);

    // Add the paper to the list of all similar commercial papers in the ledger world state
    await ctx.paperList.addPaper(citizen);
    // Must return a serialized paper to caller of smart contract
    return citizen.toBuffer();
  }

  async deleteCitizen(ctx, carNumber, make, model, color, owner) {
    // create an instance of the paper
    let paper = Citizen.createInstance(issuer, paperNumber, issueDateTime, maturityDateTime, faceValue);

    // Smart contract, rather than paper, moves paper into ISSUED state
    paper.setIssued();

    // Newly issued paper is owned by the issuer
    paper.setOwner(issuer);

    // Add the paper to the list of all similar commercial papers in the ledger world state
    await ctx.paperList.addPaper(paper);

    // Must return a serialized paper to caller of smart contract
    return paper.toBuffer();
  }

  async generateElectoralRegisterSnapshot(ctx, carNumber, make, model, color, owner) {

  }

//contract end braces
}
