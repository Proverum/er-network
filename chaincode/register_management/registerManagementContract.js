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
        super('er-network.registermanagement');
    }

    /**
     * Define a custom context for commercial paper
    */
    createContext() {
        return new RegistryContext();
    }

  async initLedger(ctx) {
    console.info('============= START : Initialize Ledger ===========');
    //some dummy citizens to work with
    const citizens = [
        {
            insuranceNr: '12',
            municipality: 'Zürich',
            buildingIdentificationNr: '666',
            flatIdentificationNr: 'geddoo',
            familyName: 'McFlannigan',
            name: '',
            address: '',
            birthdate: '',
            hometown: '',
            gender: '',
            civilStatus: '',
            religion: '',
            citizenship: '',
            foreignIdentification: 'B',
            residencyStatus: 'recident or visitor',
            residencyMunicipality: '',
            moveInInfo: '',
            moveOutInfo: '',
            votingRights: '',
            deathDate: '',

        },
        {
            insuranceNr: '12',
            municipality: 'Toyota',
            buildingIdentificationNr: 'Prius',
            flatIdentificationNr: 'Tomoko',
            familyName: 'john',
            name: '',
            address: '',
            birthdate: '',
            hometown: '',
            gender: '',
            civilStatus: '',
            religion: '',
            citizenship: '',
            foreignIdentification: 'B',
            residencyStatus: 'recident or visitor',
            residencyMunicipality: '',
            moveInInfo: '',
            moveOutInfo: '',
            votingRights: '',
            deathDate: '',
        },
    ];

    for (let i = 0; i < cars.length; i++) {
        cars[i].docType = 'car';
        await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(cars[i])));
        console.info('Added <--> ', cars[i]);
    }
    console.info('============= END : Initialize Ledger ===========');
  }

  async queryCitizen(ctx, carNumber) {
    // create an instance of the paper
    let paper = CommercialPaper.createInstance(issuer, paperNumber, issueDateTime, maturityDateTime, faceValue);

    // Smart contract, rather than paper, moves paper into ISSUED state
    paper.setIssued();

    // Newly issued paper is owned by the issuer
    paper.setOwner(issuer);

    // Add the paper to the list of all similar commercial papers in the ledger world state
    await ctx.paperList.addPaper(paper);

    // Must return a serialized paper to caller of smart contract
    return paper.toBuffer();
  }

  async registerCitizen(ctx, carNumber, make, model, color, owner) {
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
