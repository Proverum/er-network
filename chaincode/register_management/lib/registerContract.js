'use strict';

const { Contract, Context } = require('fabric-contract-api');

const Citizen = require('./citizen.js');
const CitizenPublic = require('./citizenPublic.js');

// class RegisterContext extends Context {
//
//     constructor() {
//         super();
//         // All citizens are held in a the citizen registry
//         this.citizenRegistry = new CitizenRegistry(this);
//     }
//
// }

class RegisterContract extends Contract {

  constructor() {
        // Unique name when multiple contracts per chaincode file
        super('er-network.registercontract');
    }

  async instantiate(ctx) {
        // No implementation required with this example
        // It could be where data migration is performed, if necessary
        console.log('Instantiate the contract');
  }

  // createContext() {
  //       return new RegistryContext();
  // }

  static test() {
    console.info('============= START : Initialize Ledger ===========');
    //some dummy citizens to work with
    const citizens = [new Citizen('678.7888.5677.89', 'CH.AUPER.12345567', 'Spähni', 'Peter', '22.05.1980', 'Zürich', 'männlich',
      ' evangelisch-reformierte Kirche', 'verheirated', 'Schweiz', 'Zürich', 'Zürich', 'na',
      'Zürich', 'Hauptwohnsitz', '22.05.1970', 'Rämistrasse 90', '8 15', 'Zürich', '8002', 'Kollektivhaushalt'),
      new Citizen('678.9933.3677.89', 'CH.VERA.5466525', 'Rauper', 'Sandra', '13.08.2005', 'Zürich', 'weiblich',
        'römisch-katholische Kirche', 'ledig', 'Schweiz', 'Wettswil', 'Zürich', 'na',
        'Zürich', 'Hauptwohnsitz', '06.09.2010', 'Bahnhofstrasse 55', '234', 'Zürich', '8003', 'Privathaushalt'),
      new Citizen('409.2659.1234.44', 'CH.VERA.45254435', 'Muster', 'Max', '15.08.1972', 'Zürich', 'männlich',
        'Jüdisch Liberale Gemeinde', 'geschieden', 'Schweiz', 'Adliswil', 'Zürich', 'na',
        'Zürich', 'Hauptwohnsitz', '06.09.2010', 'Aegertenstrasse 77', '9283', 'Zürich', '8003', 'Privathaushalt'),

    ];

    const publicCitizens = [new CitizenPublic('678.7888.5677.89', 'Zürich'), new CitizenPublic('678.9933.3677.89', 'Zürich'),
        new CitizenPublic('409.2659.1234.44', 'Zürich'),

    ];
    for (let i = 0; i < citizens.length; i++) {
        console.log(citizens[i]);
        console.info('Added <--> ', citizens[i]);
    }
    // add full citizen information to corresponding municipality private data store
    for (let i = 0; i < publicCitizens.length; i++) {
        console.log(publicCitizens[i]);
        console.info('Added <--> ', publicCitizens[i]);
    }
    console.info('============= END : Initialize Ledger ===========');

  }

  //Zürich example with a bunch of mock citizens
  async initLedgerMunicipality(ctx) {
    console.info('============= START : Initialize Ledger ===========');
    //some dummy citizens to work with
    const citizens = [new Citizen('678.7888.5677.89', 'CH.AUPER.12345567', 'Spähni', 'Peter', '22.05.1980', 'Zürich', 'männlich',
      ' evangelisch-reformierte Kirche', 'verheirated', 'Schweiz', 'Zürich', 'Zürich', 'na',
      'Zürich', 'Hauptwohnsitz', '22.05.1970', 'Rämistrasse 90', '8 15', 'Zürich', '8002', 'Kollektivhaushalt'),
      new Citizen('678.9933.3677.89', 'CH.VERA.5466525', 'Rauper', 'Sandra', '13.08.2005', 'Zürich', 'weiblich',
        'römisch-katholische Kirche', 'ledig', 'Schweiz', 'Wettswil', 'Zürich', 'na',
        'Zürich', 'Hauptwohnsitz', '06.09.2010', 'Bahnhofstrasse 55', '234', 'Zürich', '8003', 'Privathaushalt'),
      new Citizen('409.2659.1234.44', 'CH.VERA.45254435', 'Muster', 'Max', '15.08.1972', 'Zürich', 'männlich',
        'Jüdisch Liberale Gemeinde', 'geschieden', 'Schweiz', 'Adliswil', 'Zürich', 'na',
        'Zürich', 'Hauptwohnsitz', '06.09.2010', 'Aegertenstrasse 77', '9283', 'Zürich', '8003', 'Privathaushalt'),

    ];

    const publicCitizens = [new CitizenPublic('678.7888.5677.89', 'Zürich'), new CitizenPublic('678.9933.3677.89', 'Zürich'),
        new CitizenPublic('409.2659.1234.44', 'Zürich'),

    ];

    //add public information to corresponding canton and confederation
    for (let i = 0; i < citizens.length; i++) {
        await ctx.stub.putPrivateData( "collectionCitizenMunicipality", 'CITIZEN' + i, Buffer.from(JSON.stringify(citizens[i])));
        console.info('Added <--> ', citizens[i]);
    }
    // add full citizen information to corresponding municipality private data store
    for (let i = 0; i < publicCitizens.length; i++) {
        await ctx.stub.putPrivateData( "collectionPublicCitizenMunicipality", 'PUBLICCITIZEN' + i, Buffer.from(JSON.stringify(publicCitizens[i])));
        console.info('Added <--> ', publicCitizens[i]);
    }
    console.info('============= END : Initialize Ledger ===========');
  }

  //Bassersdorf example with a bunch of mock citizens
  async initLedgerMunicipality2(ctx) {
    console.info('============= START : Initialize Ledger ===========');
    //some dummy citizens to work with
    const citizens = [new Citizen('678.7888.5677.89', 'CH.AUPER.123298367', 'Laubi', 'Johan', '12.02.88', 'Baar', 'männlich',
      ' evangelisch-reformierte Kirche', 'verheirated', 'Schweiz', 'Baar', 'Zug', 'na',
      'Bassersdorf', 'Hauptwohnsitz', '22.09.1980', 'Basserstrasse 78', '8879', 'Bassersdorf', '8303', 'Kollektivhaushalt'),
      new Citizen('724.9933.3237.89', 'CH.VERA.923411', 'Lehner', 'Jasmin', '13.08.2005', 'Zürich', 'weiblich',
        'römisch-katholische Kirche', 'ledig', 'Schweiz', 'Horgen', 'Zürich', 'na',
        'Bassersdorf', 'Hauptwohnsitz', '06.06.2008', 'Hinterweg 43', '78984', 'Bassersdorf', '8303', 'Privathaushalt'),
      new Citizen('466.6666.4446.12', 'CH.ZAR.78342', 'Gonzalez', 'Jorge', '26.03.1990', 'Madrid', 'männlich',
        'römisch-katholische Kirche', 'ledig', 'Spanien', 'Madrid', 'na', 'B',
        'Bassersdorf', 'Hauptwohnsitz', '02.10.2011', 'Hautstrasse 1', '234', 'Bassersdorf', '8303', 'Privathaushalt'),
    ];

    const publicCitizens = [new CitizenPublic('678.7888.5677.89', 'Bassersdorf'), new CitizenPublic('724.9933.3237.89', 'Bassersdorf'),
        new CitizenPublic('466.6666.4446.12', 'Bassersdorf'),

    ];

    //add public information to corresponding canton and confederation
    for (let i = 0; i < citizens.length; i++) {
        await ctx.stub.putPrivateData( "collectionCitizenMunicipality2", 'CITIZEN' + i, Buffer.from(JSON.stringify(citizens[i])));
        console.info('Added <--> ', citizens[i]);
    }
    // add full citizen information to corresponding municipality private data store
    for (let i = 0; i < publicCitizens.length; i++) {
        await ctx.stub.putPrivateData( "collectionPublicCitizenMunicipality2", 'PUBLICCITIZEN' + i, Buffer.from(JSON.stringify(publicCitizens[i])));
        console.info('Added <--> ', publicCitizens[i]);
    }
    console.info('============= END : Initialize Ledger ===========');
  }

  //Wallisellen example with a bunch of mock citizens
  async initLedgerMunicipality3(ctx) {
    console.info('============= START : Initialize Ledger ===========');

    const citizens = [new Citizen('487.6662.1099.45', 'SuisseId.02', 'Johnson', 'Mike', '22.09.1979', 'Seattle', 'männlich',
      ' evangelisch-reformierte Kirche', 'verheirated', 'USA', 'New York', 'na', 'A',
      'Wallisellen', 'Hauptwohnsitz', '22.09.2003', 'Wallisellerstrasse 78', '123', 'Wallisellen', '8304', 'Kollektivhaushalt'),
      new Citizen('925.4567.1342.24', 'CH.INFOSTAR.235453', 'Rand', 'Alf', '13.08.1992', 'Zürich', 'männlich',
        'römisch-katholische Kirche', 'ledig', 'Schweiz', 'Davos', 'Graubünden', 'na',
        'Wallisellen', 'Nebenwohnsitz', '06.06.2013', 'Hügelweg 10', '11', 'Wallisellen', '8304', 'Sammelhaushalt'),
      new Citizen('275.5544.2948.02', 'CH.VERA.263453', 'Schwab', 'Lena', '26.03.82', 'Altdorf', 'weiblich',
        'israelitische Gemeinschaft / jüdische Glaubensgemeinschaft', 'verheiratet', 'Schweiz', 'Altdorf', 'Uri', 'na',
        'Wallisellen', 'Hauptwohnsitz', '09.08.2015', 'Usterstrasse 9b', '192', 'Wallisellen', '8304', 'Privathaushalt'),
    ];

    const publicCitizens = [new CitizenPublic('487.6662.1099.45', 'Wallisellen'), new CitizenPublic('925.4567.1342.24', 'Wallisellen'),
        new CitizenPublic('275.5544.2948.02', 'Wallisellen'),

    ];

    //add public information to corresponding canton and confederation
    for (let i = 0; i < citizens.length; i++) {
        await ctx.stub.putPrivateData( "collectionCitizenMunicipality3", 'CITIZEN' + i, Buffer.from(JSON.stringify(citizens[i])));
        console.info('Added <--> ', citizens[i]);
    }
    // add full citizen information to corresponding municipality private data store
    for (let i = 0; i < publicCitizens.length; i++) {
        await ctx.stub.putPrivateData( "collectionPublicCitizenMunicipality3", 'PUBLICCITIZEN' + i, Buffer.from(JSON.stringify(publicCitizens[i])));
        console.info('Added <--> ', publicCitizens[i]);
    }
    console.info('============= END : Initialize Ledger ===========');
  }

  async queryCitizen(ctx, citizenkey) {

    const citizenAsBytes = await ctx.stub.getState(citizenkey); // get the citizen from chaincode state
        if (!citizenAsBytes || citizenAsBytes.length === 0) {
            throw new Error(`${citizenkey} does not exist`);
        }
        console.log(citizenAsBytes.toString());
        return citizenAsBytes.toString();
  }

  async queryAllCitizens(ctx) {
        const startKey = 'CITIZEN=';
        const endKey = 'CITIZEN999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

  // async addCitizen(ctx, vn, localPersonId, officialName, firstName, dateOfBirth, placeofBirth, sex,
  //   religion, maritalStatus, nationality, originName, canton, residencePermit,
  //   reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold) {
  //   // create an instance of the paper
  //   let citizen = new Citizen(vn, localPersonId, officialName, firstName, dateOfBirth, placeofBirth, sex,
  //     religion, maritalStatus, nationality, originName, canton, residencePermit,
  //     reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold)
  //
  //   await ctx.citizenRegistry.addCitizen(citizen);
  //   return citizen.toBuffer();
  // }
  //
  // async moveCitizen(ctx, vn, localPersonId, officialName, firstName, dateOfBirth, placeofBirth, sex,
  //   religion, maritalStatus, nationality, originName, canton, residencePermit,
  //   reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold) {
  //
  //   let citizen = new Citizen(vn, localPersonId, officialName, firstName, dateOfBirth, placeofBirth, sex,
  //     religion, maritalStatus, nationality, originName, canton, residencePermit,
  //     reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold)
  //
  //   await ctx.citizenRegistry.addCitizen(citizen);
  //   return citizen.toBuffer();
  // }
  //
  // async deleteCitizen(ctx, carNumber, make, model, color, owner) {
  //
  //   await ctx.citizenRegistry.deleteCitizen(paper);
  //   return paper.toBuffer();
  // }
  //
  // async generateElectoralRegisterSnapshot(ctx) {
  //
  // }
//contract end braces
}

module.exports=RegisterContract;
