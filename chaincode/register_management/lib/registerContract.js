'use strict';

const { Contract, Context } = require('fabric-contract-api');
const shim = require('fabric-shim');
const util = require('util');

const Citizen = require('./citizen.js');
const CitizenPublic = require('./citizenPublic.js');
const VotingCitizen = require('./votingCitizen.js');
const VoterList = require('./voterListDataType');



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

  static test() {
    console.info('============= START : Initialize Ledger ===========');
    //some dummy citizens to work with
    let citizens = [new Citizen('678.7888.5677.89', 'CH.AUPER.12345567', 'Spähni', 'Peter', '22.05.1980', 'Zürich', 'männlich',
      ' evangelisch-reformierte Kirche', 'verheirated', 'Schweiz', 'Zürich', 'Zürich', 'na',
      'Zürich', 'Hauptwohnsitz', '22.05.1970', 'Rämistrasse 90', '8 15', 'Zürich', '8002', 'Kollektivhaushalt'),
      new Citizen('678.9933.3677.89', 'CH.VERA.5466525', 'Rauper', 'Sandra', '13.08.2005', 'Zürich', 'weiblich',
        'römisch-katholische Kirche', 'ledig', 'Schweiz', 'Wettswil', 'Zürich', 'na',
        'Zürich', 'Hauptwohnsitz', '06.09.2010', 'Bahnhofstrasse 55', '234', 'Zürich', '8003', 'Privathaushalt'),
      new Citizen('409.2659.1234.44', 'CH.VERA.45254435', 'Muster', 'Max', '15.08.1972', 'Zürich', 'männlich',
        'Jüdisch Liberale Gemeinde', 'geschieden', 'Schweiz', 'Adliswil', 'Zürich', 'na',
        'Zürich', 'Hauptwohnsitz', '06.09.2010', 'Aegertenstrasse 77', '9283', 'Zürich', '8003', 'Privathaushalt'),

    ];

    let publicCitizens = [new CitizenPublic('678.7888.5677.89', 'Zürich'), new CitizenPublic('678.9933.3677.89', 'Zürich'),
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
    let citizens = [new Citizen('678.7888.5677.89', 'CH.AUPER.12345567', 'Spähni', 'Peter', '1980/05/18', 'Zürich', 'männlich',
      ' evangelisch-reformierte Kirche', 'verheirated', 'Schweiz', 'Zürich', 'Zürich', 'na',
      'Zürich', 'Hauptwohnsitz', '22.05.1970', 'Rämistrasse 90', '8 15', 'Zürich', '8002', 'Kollektivhaushalt'),
      new Citizen('678.9933.3677.89', 'CH.VERA.5466525', 'Rauper', 'Sandra', '2010/03/26', 'Zürich', 'weiblich',
        'römisch-katholische Kirche', 'ledig', 'Schweiz', 'Wettswil', 'Zürich', 'na',
        'Zürich', 'Hauptwohnsitz', '06.09.2010', 'Bahnhofstrasse 55', '234', 'Zürich', '8003', 'Privathaushalt'),
      new Citizen('409.2659.1234.44', 'CH.VERA.45254435', 'Muster', 'Max', '1950/07/01', 'Zürich', 'männlich',
        'Jüdisch Liberale Gemeinde', 'geschieden', 'Schweiz', 'Adliswil', 'Zürich', 'na',
        'Zürich', 'Hauptwohnsitz', '06.09.2010', 'Aegertenstrasse 77', '9283', 'Zürich', '8003', 'Privathaushalt'),

    ];

    let publicCitizens = [new CitizenPublic('678.7888.5677.89', 'Zürich'), new CitizenPublic('678.9933.3677.89', 'Zürich'),
        new CitizenPublic('409.2659.1234.44', 'Zürich'),

    ];

    //add public information to corresponding canton and confederation
    for (let i = 0; i < citizens.length; i++) {
        await ctx.stub.putPrivateData( "collectionCitizenMunicipality", 'CITIZEN' + i, Buffer.from(JSON.stringify(citizens[i])));
        console.info('Added <--> ', citizens[i]);
    }
    // add full citizen information to corresponding municipality private data store
    for (let j = 0; j < publicCitizens.length; j++) {
        await ctx.stub.putPrivateData( "collectionPublicCitizenMunicipality", 'PUBLIC_CITIZEN_MUNICIPALITY_' + j, Buffer.from(JSON.stringify(publicCitizens[j])));
        console.info('Added <--> ', publicCitizens[j]);
    }
    console.info('============= END : Initialize Ledger ===========');
  }

  //Bassersdorf example with a bunch of mock citizens
  async initLedgerMunicipalityTwo(ctx) {
    console.info('============= START : Initialize Ledger ===========');
    //some dummy citizens to work with
    let citizens = [new Citizen('678.7888.5677.89', 'CH.AUPER.123298367', 'Laubi', 'Johan', '1988/02/12', 'Baar', 'männlich',
      ' evangelisch-reformierte Kirche', 'verheirated', 'Schweiz', 'Baar', 'Zug', 'na',
      'Bassersdorf', 'Hauptwohnsitz', '22.09.1980', 'Basserstrasse 78', '8879', 'Bassersdorf', '8303', 'Kollektivhaushalt'),
      new Citizen('724.9933.3237.89', 'CH.VERA.923411', 'Lehner', 'Jasmin', '20057/08/05', 'Zürich', 'weiblich',
        'römisch-katholische Kirche', 'ledig', 'Schweiz', 'Horgen', 'Zürich', 'na',
        'Bassersdorf', 'Hauptwohnsitz', '06.06.2008', 'Hinterweg 43', '78984', 'Bassersdorf', '8303', 'Privathaushalt'),
      new Citizen('466.6666.4446.12', 'CH.ZAR.78342', 'Gonzalez', 'Jorge', '1990/03/25', 'Madrid', 'männlich',
        'römisch-katholische Kirche', 'ledig', 'Spanien', 'Madrid', 'na', 'B',
        'Bassersdorf', 'Hauptwohnsitz', '02.10.2011', 'Hautstrasse 1', '234', 'Bassersdorf', '8303', 'Privathaushalt'),

    ];

    let publicCitizens = [new CitizenPublic('678.7888.5677.89', 'Bassersdorf'), new CitizenPublic('724.9933.3237.89', 'Bassersdorf'),
        new CitizenPublic('466.6666.4446.12', 'Bassersdorf'),

    ];

    //add public information to corresponding canton and confederation
    for (let i = 0; i < citizens.length; i++) {
        await ctx.stub.putPrivateData( "collectionCitizenMunicipalityTwo", 'CITIZEN' + i, Buffer.from(JSON.stringify(citizens[i])));
        console.info('Added <--> ', citizens[i]);
    }
    // add full citizen information to corresponding municipality private data store
    for (let j = 0; j < publicCitizens.length; j++) {
        await ctx.stub.putPrivateData( "collectionPublicCitizenMunicipalityTwo", 'PUBLIC_CITIZEN_MUNICIPALITY2_' + j, Buffer.from(JSON.stringify(publicCitizens[j])));
        console.info('Added <--> ', publicCitizens[j]);
    }
    console.info('============= END : Initialize Ledger ===========');
  }

  //Wallisellen example with a bunch of mock citizens
  async initLedgerMunicipalityThree(ctx) {
    console.info('============= START : Initialize Ledger ===========');
    //dummy variables wallisellen example
    let citizens = [new Citizen('487.6662.1099.45', 'SuisseId.02', 'Johnson', 'Mike', '1979/09/09', 'Seattle', 'männlich',
      ' evangelisch-reformierte Kirche', 'verheirated', 'USA', 'New York', 'na', 'A',
      'Wallisellen', 'Hauptwohnsitz', '22.09.2003', 'Wallisellerstrasse 78', '123', 'Wallisellen', '8304', 'Kollektivhaushalt'),
      new Citizen('925.4567.1342.24', 'CH.INFOSTAR.235453', 'Rand', 'Alf', '1992/08/17', 'Zürich', 'männlich',
        'römisch-katholische Kirche', 'ledig', 'Schweiz', 'Davos', 'Graubünden', 'na',
        'Wallisellen', 'Nebenwohnsitz', '06.06.2013', 'Hügelweg 10', '11', 'Wallisellen', '8304', 'Sammelhaushalt'),
      new Citizen('275.5544.2948.02', 'CH.VERA.263453', 'Schwab', 'Lena', '1982/06/04', 'Altdorf', 'weiblich',
        'israelitische Gemeinschaft / jüdische Glaubensgemeinschaft', 'verheiratet', 'Schweiz', 'Altdorf', 'Uri', 'na',
        'Wallisellen', 'Hauptwohnsitz', '09.08.2015', 'Usterstrasse 9b', '192', 'Wallisellen', '8304', 'Privathaushalt'),
    ];

    let publicCitizens = [new CitizenPublic('487.6662.1099.45', 'Wallisellen'), new CitizenPublic('925.4567.1342.24', 'Wallisellen'),
        new CitizenPublic('275.5544.2948.02', 'Wallisellen'),

    ];

    //add public information to corresponding canton and confederation
    for (let i = 0; i < citizens.length; i++) {
        await ctx.stub.putPrivateData( "collectionCitizenMunicipalityThree", 'CITIZEN' + i, Buffer.from(JSON.stringify(citizens[i])));
        console.info('Added <--> ', citizens[i]);
    }
    // add full citizen information to corresponding municipality private data store
    for (let j = 0; j < publicCitizens.length; j++) {
        await ctx.stub.putPrivateData( "collectionPublicCitizenMunicipalityThree", 'PUBLIC_CITIZEN_MUNICIPALITY3_' + j, Buffer.from(JSON.stringify(publicCitizens[j])));
        console.info('Added <--> ', publicCitizens[j]);
    }
    console.info('============= END : Initialize Ledger ===========');
  }

  async queryCitizen(ctx, collection, citizenkey) {

    const citizenAsBytes = await ctx.stub.getPrivateData(collection, citizenkey); // get the citizen from chaincode state type Buffer
    if (!citizenAsBytes || citizenAsBytes.length === 0) {
          throw new Error(`${citizenkey} does not exist`);
    }

    const citizenObject = Citizen.fromBuffer(citizenAsBytes);
    return citizenObject;
  }

  async getCitizensByRange(ctx, startKey, endKey, collection) {

    let iterator = await ctx.stub.getPrivateDataByRange(collection, startKey, endKey);

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

  async getAllCitizens(ctx, collection) {

    //empty string start and end key to fetch all
    const startKey = "";
    const endKey = "";

    const range = await ctx.stub.getPrivateDataByRange(collection, startKey, endKey);

    // let promiseOfIterator = ctx.stub.getPrivateDataByRange(collection, startKey, endKey);
    // let results = await getAllResults(promiseOfIterator);

    const allResults = [];
    while (true) {
        let res = await range.iterator.next();

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
            await range.iterator.close();
            console.info(allResults);
            return JSON.stringify(allResults);
        }
    }
  }

  async addCitizen(ctx, vn, localPersonId, officialName, firstName, dateOfBirth, placeofBirth, sex,
    religion, maritalStatus, nationality, originName, canton, residencePermit,
    reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold, collection, citizenKey) {
    // create an instance of the paper
    // ==== Check if marble already exists ====
    const citizenAsBytes = await ctx.stub.getPrivateData(collection, citizenkey);
    if (citizenAsBytes.toString()) {
      throw new Error('This citizen already exists: ');
    }

    let citizen = new Citizen(vn, localPersonId, officialName, firstName, dateOfBirth, placeofBirth, sex,
      religion, maritalStatus, nationality, originName, canton, residencePermit,
      reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold);

    //have to add to public collection as well

    await ctx.stub.putPrivateData(collection, citizenKey, Buffer.from(JSON.stringify(citizen)));
    console.info('Added <--> ', citizen);
    return citizen;
  }


  async deleteCitizen(ctx, collection, citizenkey) {

    const citizenAsBytes = await ctx.stub.getPrivateData(collection, citizenkey);  // get the citizen from chaincode state

    if (!citizenAsBytes || citizenAsBytes.length === 0) {
          throw new Error(`${citizenkey} does not exist`);
    }

    await ctx.stub.deletePrivateData(collection, citizenkey);

  }

  async generateElectoralRegisterSnapshot(ctx, collection, erKey) {

    const startKey = "";
    const endKey = "";

    const allCitizensAsBytes = await ctx.stub.getPrivateDataByRange(collection, startKey, endKey);

    // let promiseOfIterator = ctx.stub.getPrivateDataByRange(collection, startKey, endKey);
    // let results = await getAllResults(promiseOfIterator);

    const allVoters = [];
    while (true) {
        let citizenObject = await allCitizensAsBytes.iterator.next();
        if (citizenObject.value) {
            console.log(res.value.value.toString('utf8'));
            var TypeOfResidenceType = JSON.parse(citizenObject.value.value.MainResidence.typeOfResidenceType.toString('utf8'));
            var VotingRestriction = JSON.parse(citizenObject.value.value.restrictedVoting.toString('utf8'));
            var Nationality = JSON.parse(citizenObject.value.value.personData.nationality.toString('utf8'));
            let today = new Date();
            let birthDate = new Date(JSON.parse(citizenObject.value.value.personData.dateOfBirth.toString('utf8')));
            let age = today.getFullYear() - birthDate.getFullYear();
            let m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            // check if a citizen is allowed to vote in the given register
            if(age >= 18 && TypeOfResidenceType=="Hauptwohnsitz" && VotingRestriction=="false" && Nationality=="Schweiz"){
              var Influence = ['CH', '1', 'Bund', 'CT', '1', 'Kanton Zürich'];
              try {
                let Vn = JSON.parse(citizenObject.value.value.personData.vn.toString('utf8'));
                let LocalPersonId = JSON.parse(citizenObject.value.value.personData.localPersonId.toString('utf8'));
                let OfficialName = JSON.parse(citizenObject.value.value.personData.officialName.toString('utf8'));
                let FirstName = JSON.parse(citizenObject.value.value.personData.firstName.toString('utf8'));
                let Sex = JSON.parse(citizenObject.value.value.personData.sex.toString('utf8'));
                let DateOfBirth = JSON.parse(citizenObject.value.value.personData.dateOfBirth.toString('utf8'));
                let LanguageOfCorrespondance = JSON.parse(citizenObject.value.value.personData.sex.toString('utf8'));
                let Municipality = JSON.parse(citizenObject.value.value.MainResidence.reportingMunicipality.toString('utf8'));
                let ArrivalDate = JSON.parse(citizenObject.value.value.MainResidence.arrivalDate.toString('utf8'));
                let TypeOfHousehold = JSON.parse(citizenObject.value.value.MainResidence.dwellingAddress.typeOfHousehold.toString('utf8'));
                let DataLock = "false";
                let Street = JSON.parse(citizenObject.value.value.MainResidence.dwellingAddress.address.street.toString('utf8'));
                let PostOfficeBox = JSON.parse(citizenObject.value.value.MainResidence.dwellingAddress.address.postOfficeBoxText.toString('utf8'));
                let City = JSON.parse(citizenObject.value.value.MainResidence.dwellingAddress.address.city.toString('utf8'));
                let SwissZipCode = JSON.parse(citizenObject.value.value.MainResidence.dwellingAddress.address.swissZipCode.toString('utf8'));
                if (Municipality="Bassersdorf") {
                  municipalityInfluence = ['MU', '23', 'Gemeinde Bassersdorf'];
                  Influence = influence.concat(municipalityInfluence);
                }else if (Municipality="Zürich") {
                  municipalityInfluence = ['MU', '261', 'Stadt Zürich'];
                  Influence = influence.concat(municipalityInfluence);
                }else {
                  //only remaining municipality in this use case is wallisellen
                  municipalityInfluence = ['MU', '45', 'Gemeinde Wallisellen'];
                  Influence = influence.concat(municipalityInfluence);
                }
                var voter = new VotingCitizen(Vn, LocalPersonId, OfficialName, FirstName, Sex, DateOfBirth, LanguageOfCorrespondance, Municipality, DataLock, Municipality,
                  TypeOfResidenceType, ArrivalDate, Street, PostOfficeBox, City, SwissZipCode, TypeOfHousehold, Influence);
                await ctx.stub.putPrivateData(collection, VotingCitizen.makeKey([Vn, Municipality]), Buffer.from(JSON.stringify(voter)));

              } catch (err) {
                  console.log(err);
              }
            };
            allVoters.push(voter);
        }
        if (res.done) {
            console.log('end of data');
            await range.iterator.close();
            var erRegister = new VoterList(Municipality, allVoters);
            await ctx.stub.putPrivateData(collection, erKey, Buffer.from(JSON.stringify(erRegister)));
            console.info('Generated and added er-register to private data');
            return JSON.stringify(erRegister);
        }
    }
  }

  async queryVoter(ctx, collection, voterkey) {

    const voterAsBytes = await ctx.stub.getPrivateData(collection, voterkey); // get the citizen from chaincode state type Buffer
    if (!voterAsBytes || v.length === 0) {
          throw new Error(`${voterkey} does not exist`);
    }

    const voterObject = VotingCitizen.fromBuffer(voterAsBytes);
    return voterObject;
  }

  async queryER(ctx, collection, erKey) {

    const registerAsBytes = await ctx.stub.getPrivateData(collection, erKey);  // get the citizen from chaincode state

    if (!registerAsBytes || registerAsBytes.length === 0) {
          throw new Error(`${erKey} does not exist`);
    }

    const voterListObject = VoterList.fromBuffer(registerAsBytes);
    return voterListObject;

  }

  async shareER(ctx, collectionOrigin, collectionDestination) {
    const startKey = "";
    const endKey = "";

    const allCitizensAsBytes = await ctx.stub.getPrivateDataByRange(collection, startKey, endKey);

    while (true) {
        let res = await range.iterator.next();
        //transfer the individual voters
        if (res.value && res.value.value.personData.toString()) {
            console.log(res.value.value.toString('utf8'));
            const Key = res.value.key;
            const voterObject = VotingCitizen.fromBuffer(res.value);
            await ctx.stub.putPrivateData(collectionDestination, Key, Buffer.from(JSON.stringify(voterObject)));
        }
        // transfer the list of all voters
        else if (res.value && res.value.value.voter.toString()) {
            console.log(res.value.value.toString('utf8'));
            const Key = res.value.key;
            var erRegister = new VoterList.fromBuffer(res.value);
            await ctx.stub.putPrivateData(collectionDestination, Key, Buffer.from(JSON.stringify(erRegister)));
        }
        if (res.done) {
            console.log('end of data');
            await range.iterator.close();
        }
    }

  }

  // only implement this schnick schnack if enough time...
  // async addCitizenToER(ctx) {
  //
  // }
  //
  // async removeCitizenFromER(ctx) {
  //
  // }


//contract end braces
}

module.exports=RegisterContract;
