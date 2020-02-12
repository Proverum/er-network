'use strict';

const { Contract, Context } = require('fabric-contract-api');
const shim = require('fabric-shim');
const util = require('util');
var hash = require('object-hash');


const Citizen = require('./citizen.js');
const CitizenPublic = require('./citizenPublic.js');
const VotingCitizen = require('./votingCitizen.js');
const VoterList = require('./voterListDataType.js');
const Hash = require('./hash.js');




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

  //Zuerich example with a bunch of mock citizens
  async initLedgerMunicipality(ctx) {
    console.info('============= START : Initialize Ledger ===========');
    //some dummy citizens to work with
    let citizens = [new Citizen('7567888567789', 'CH.AUPER.12345567', 'Spähni', 'Peter', '1980/05/18', 'Zuerich', 'männlich',
      ' evangelisch-reformierte Kirche', 'verheirated', 'Schweiz', 'Zuerich', 'Zuerich', 'na',
      'Zuerich', 'Hauptwohnsitz', '22.05.1970', 'Rämistrasse 90', '8 15', 'Zuerich', '8002', 'Kollektivhaushalt'),
      new Citizen('7569933367789', 'CH.VERA.5466525', 'Rauper', 'Sandra', '2010/03/26', 'Zuerich', 'weiblich',
        'römisch-katholische Kirche', 'ledig', 'Schweiz', 'Wettswil', 'Zuerich', 'na',
        'Zuerich', 'Hauptwohnsitz', '06.09.2010', 'Bahnhofstrasse 55', '234', 'Zuerich', '8003', 'Privathaushalt'),
      new Citizen('7562659123444', 'CH.VERA.45254435', 'Muster', 'Max', '1950/07/01', 'Zuerich', 'männlich',
        'Jüdisch Liberale Gemeinde', 'geschieden', 'Schweiz', 'Adliswil', 'Zuerich', 'na',
        'Zuerich', 'Hauptwohnsitz', '06.09.2010', 'Aegertenstrasse 77', '9283', 'Zuerich', '8003', 'Privathaushalt'),

    ];

    let publicCitizens = [new CitizenPublic('7567888567789', 'Zuerich'), new CitizenPublic('7569933367789', 'Zuerich'),
        new CitizenPublic('7562659123444', 'Zuerich'),

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
    let citizens = [new Citizen('7567888567789', 'CH.AUPER.123298367', 'Laubi', 'Johan', '1988/02/12', 'Baar', 'männlich',
      ' evangelisch-reformierte Kirche', 'verheirated', 'Schweiz', 'Baar', 'Zug', 'na',
      'Bassersdorf', 'Hauptwohnsitz', '22.09.1980', 'Basserstrasse 78', '8879', 'Bassersdorf', '8303', 'Kollektivhaushalt'),
      new Citizen('7569933323789', 'CH.VERA.923411', 'Lehner', 'Jasmin', '20057/08/05', 'Zuerich', 'weiblich',
        'römisch-katholische Kirche', 'ledig', 'Schweiz', 'Horgen', 'Zuerich', 'na',
        'Bassersdorf', 'Hauptwohnsitz', '06.06.2008', 'Hinterweg 43', '78984', 'Bassersdorf', '8303', 'Privathaushalt'),
      new Citizen('7566666444612', 'CH.ZAR.78342', 'Gonzalez', 'Jorge', '1990/03/25', 'Madrid', 'männlich',
        'römisch-katholische Kirche', 'ledig', 'Spanien', 'Madrid', 'na', 'B',
        'Bassersdorf', 'Hauptwohnsitz', '02.10.2011', 'Hautstrasse 1', '234', 'Bassersdorf', '8303', 'Privathaushalt'),

    ];

    let publicCitizens = [new CitizenPublic('7567888567789', 'Bassersdorf'), new CitizenPublic('7569933323789', 'Bassersdorf'),
        new CitizenPublic('7566666444612', 'Bassersdorf'),

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
    let citizens = [new Citizen('7566662109945', 'SuisseId.02', 'Johnson', 'Mike', '1979/09/09', 'Seattle', 'männlich',
      ' evangelisch-reformierte Kirche', 'verheirated', 'USA', 'New York', 'na', 'A',
      'Wallisellen', 'Hauptwohnsitz', '22.09.2003', 'Wallisellerstrasse 78', '123', 'Wallisellen', '8304', 'Kollektivhaushalt'),
      new Citizen('7564567134224', 'CH.INFOSTAR.235453', 'Rand', 'Alf', '1992/08/17', 'Zuerich', 'männlich',
        'römisch-katholische Kirche', 'ledig', 'Schweiz', 'Davos', 'Graubünden', 'na',
        'Wallisellen', 'Nebenwohnsitz', '06.06.2013', 'Hügelweg 10', '11', 'Wallisellen', '8304', 'Sammelhaushalt'),
      new Citizen('7565544294802', 'CH.VERA.263453', 'Schwab', 'Lena', '1982/06/04', 'Altdorf', 'weiblich',
        'israelitische Gemeinschaft / jüdische Glaubensgemeinschaft', 'verheiratet', 'Schweiz', 'Altdorf', 'Uri', 'na',
        'Wallisellen', 'Hauptwohnsitz', '09.08.2015', 'Usterstrasse 9b', '192', 'Wallisellen', '8304', 'Privathaushalt'),
    ];

    let publicCitizens = [new CitizenPublic('7566662109945', 'Wallisellen'), new CitizenPublic('7564567134224', 'Wallisellen'),
        new CitizenPublic('7565544294802', 'Wallisellen'),

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

  //Dübendorf example with a bunch of mock citizens
  async initLedgerMunicipalityFour(ctx) {
    console.info('============= START : Initialize Ledger ===========');
    //dummy variables wallisellen example
    let citizens = [new Citizen('7566262108235', 'CH:AUPER', 'Flack', 'Doris', '1975/05/021', 'Cham', 'männlich',
      ' evangelisch-reformierte Kirche', 'verheirated', 'Schweiz', 'Cham', 'na', 'A',
      'Dübendorf', 'Hauptwohnsitz', '22.09.2003', 'Dübenerstrasse 1a', '0045', 'Dübendorf', '8600', 'Kollektivhaushalt'),
      new Citizen('7564528634554', 'CH.INFOSTAR.235453', 'Topfer', 'Tom', '1992/08/17', 'Zuerich', 'männlich',
        'römisch-katholische Kirche', 'ledig', 'Schweiz', 'Davos', 'Graubünden', 'na',
        'Dübendorf', 'Hauptwohnsitz', '06.06.2013', 'Hügelweg 10', '11', 'Dübendorf', '8600', 'Sammelhaushalt'),
      new Citizen('7565534984777', 'CH.VERA.263453', 'Sutskever', 'Nina', '1982/06/04', 'Altdorf', 'weiblich',
        'israelitische Gemeinschaft / jüdische Glaubensgemeinschaft', 'verheiratet', 'Schweiz', 'Altdorf', 'Uri', 'na',
        'Dübendorf', 'Hauptwohnsitz', '09.08.2015', 'Usterstrasse 9b', '192', 'Dübendorf', '8600', 'Privathaushalt'),
    ];

    let publicCitizens = [new CitizenPublic('7566262108235', 'Dübendorf'), new CitizenPublic('7564528634554', 'Dübendorf'),
        new CitizenPublic('7565534984777', 'Dübendorf'),

    ];

    //add public information to corresponding canton and confederation
    for (let i = 0; i < citizens.length; i++) {
        await ctx.stub.putPrivateData( "collectionCitizenMunicipalityFour", 'CITIZEN' + i, Buffer.from(JSON.stringify(citizens[i])));
        console.info('Added <--> ', citizens[i]);
    }
    // add full citizen information to corresponding municipality private data store
    for (let j = 0; j < publicCitizens.length; j++) {
        await ctx.stub.putPrivateData( "collectionPublicCitizenMunicipalityFour", 'PUBLIC_CITIZEN_MUNICIPALITY4_' + j, Buffer.from(JSON.stringify(publicCitizens[j])));
        console.info('Added <--> ', publicCitizens[j]);
    }
    console.info('============= END : Initialize Ledger ===========');
  }

  async queryCitizen(ctx, collection, citizenkey) {

    const citizenAsBytes = await ctx.stub.getPrivateData(collection, citizenkey); // get the citizen from chaincode state type Buffer
    if (!citizenAsBytes || citizenAsBytes.length === 0) {
          throw new Error(`${citizenkey} does not exist`);
    }

    //const citizenObject = Citizen.fromBuffer(citizenAsBytes);
    return citizenAsBytes.toString();
  }

  async getCitizensByRange(ctx, startKey, endKey, collection) {

    let iterator = await ctx.stub.getPrivateDataByRange(collection, startKey, endKey);

    let allResults = [];
    while (true) {
        let res = await iterator.next();

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
            return Buffer.from(JSON.stringify(allResults));
        }
    }
  }

// kind of similar to get all private data from collection x
  async getAllIdentities(ctx, collection) {

    //empty string start and end key to fetch all
    const startKey = "";
    const endKey = "";

    const range = await ctx.stub.getPrivateDataByRange(collection, startKey, endKey);

    let allResults = [];
    while (true) {
        let res = await range.iterator.next();

        if (res.value && res.value.value.toString()) {
            console.log(res.value.value.toString('utf8'));

            const Key = res.value.key;
            let Record;
            try {
                Record = await JSON.parse(res.value.value.toString('utf8'));
                allResults.push({ Key, Record });

            } catch (err) {
                console.log(err);
                Record = res.value.value.toString('utf8');
            }
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
    const citizenAsBytes = await ctx.stub.getPrivateData(collection, citizenKey);
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

  //only for trial purposes function itself is of no use in this usecase
  async updateCitizen(ctx, collection, citizenkey, newkey) {

    const citizenAsBytes = await ctx.stub.getPrivateData(collection, citizenkey); // get the citizen from chaincode state type Buffer
    if (!citizenAsBytes || v.length === 0) {
          throw new Error(`${voterkey} does not exist`);
    }

    const citizen = JSON.parse(citizenAsBytes.toString());
    const personData = citizen.personData;
    citizen.key = newkey;

    await ctx.stub.putState(newkey, Buffer.from(JSON.stringify(citizen)));
    console.info('============= END : changeCarOwner ===========');
  }

  async generateERSnapshot(ctx, collection) {

    //empty string start and end key to fetch all
    const startKey = "";
    const endKey = "";

    const range = await ctx.stub.getPrivateDataByRange(collection, startKey, endKey);
    let allResults = [];
    let voters = [];
    let invokingMunicipality;
    while (true) {
        let res = await range.iterator.next();

        if (res.value && res.value.value.toString()) {
            console.log(res.value.value.toString('utf8'));

            const Key = res.value.key;
            let Record;
            try {
                Record = await JSON.parse(res.value.value.toString('utf8'));
                const typeOfResidenceType = Record.MainResidence.typeOfResidenceType;
                const votingRestriction = Record.restrictedVoting;
                const nationality = Record.personData.nationality;
                let today = new Date();
                let birthDate = new Date(Record.personData.birthData.dateOfBirth);
                var age = today.getFullYear() - birthDate.getFullYear();
                var m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                // checks if a citizen is allowed to vote
                if(age >= 18 && typeOfResidenceType=="Hauptwohnsitz" && votingRestriction=="false" && nationality=="Schweiz"){
                  let influence = ['CH', '1', 'Bund', 'CT', '1', 'Kanton Zuerich'];
                  let vn = Record.personData.personIdentificationData.vn;
                  let localPersonId = Record.personData.personIdentificationData.localPersonId;
                  let officialName = Record.personData.nameData.officialName;
                  let firstName = Record.personData.nameData.firstName;
                  let sex = Record.personData.personIdentificationData.sex;
                  let dateOfBirth = Record.personData.birthData.dateOfBirth;
                  let languageOfCorrespondance = "deutsch";
                  const municipality = Record.MainResidence.reportingMunicipality;
                  let arrivalDate = Record.MainResidence.arrivalDate;
                  let typeOfHousehold = Record.MainResidence.dwellingAddress.typeOfHousehold;
                  let dataLock = "false";
                  let street = Record.MainResidence.dwellingAddress.address.street;
                  let postOfficeBoxText = Record.MainResidence.dwellingAddress.address.postOfficeBoxText;
                  let city = Record.MainResidence.dwellingAddress.address.city;
                  let swissZipCode = Record.MainResidence.dwellingAddress.address.swissZipCode;
                  if (municipality=="Bassersdorf") {
                    let municipalityInfluence = ['MU', '23', 'Gemeinde Bassersdorf'];
                    influence = influence.concat(municipalityInfluence);
                  }else if (municipality=="Zuerich") {
                    let municipalityInfluence = ['MU', '261', 'Stadt Zuerich'];
                    influence = influence.concat(municipalityInfluence);
                  }else {
                    //only remaining municipality in this use case is wallisellen
                    let municipalityInfluence = ['MU', '45', 'Gemeinde Wallisellen'];
                    influence = influence.concat(municipalityInfluence);
                  }
                  let voter = new VotingCitizen(vn, localPersonId, officialName, firstName, sex, dateOfBirth, languageOfCorrespondance, municipality, dataLock, municipality,
                  typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold, influence);
                  voters.push(voter);
                  invokingMunicipality = municipality;
                  allResults.push(voter);
                }
            } catch (err) {
                console.log(err);
                Record = res.value.value.toString('utf8');
            }
        }
        if (res.done) {
            console.log('end of data');
            await range.iterator.close();
            let ElectoralRegister = new VoterList(invokingMunicipality, voters);
            allResults.push(ElectoralRegister);
            console.info(allResults);
            return JSON.stringify(allResults);
        }
    }
  }

  async persistElectoralRegister(ctx, collection, electoralRegister) {
    //store the individual voters in private collection and its hash on the public ledger (external channel)
    let electoralRegisterObject = JSON.parse(electoralRegister);
    let reportingMunicipality;
    let voterHashes = [];
    let voterList = [];
    for( var i=0 ; i < electoralRegisterObject.length-1; i++){
       // some super ugly object recreation due to json parsing issues with the domain of influence field in the votingcitizen object
        let VoterRecord = electoralRegisterObject[i];
        let influencelist = VoterRecord.domainOfInfluenceInfo;
        let masterInfluenceList = [];
        for (var index in influencelist) {
          let influenceStringList = [];
          influenceStringList.push(influencelist[index].domainOfInfluence);
          influenceStringList.push(influencelist[index].domainOfInfluenceIdentification);
          influenceStringList.push(influencelist[index].domainOfInlfluenceName);
          masterInfluenceList = masterInfluenceList.concat(influenceStringList);
        }
        let vn = VoterRecord.personData.personIdentificationData.vn;
        let localPersonId = VoterRecord.personData.personIdentificationData.localPersonId;
        let officialName = VoterRecord.personData.personIdentificationData.officialName;
        let firstName = VoterRecord.personData.personIdentificationData.firstName;
        let sex = VoterRecord.personData.personIdentificationData.sex;
        let dateOfBirth = VoterRecord.personData.personIdentificationData.dateOfBirth;
        let languageOfCorrespondance = "deutsch";
        let municipality = VoterRecord.personData.municipality;
        let arrivalDate = VoterRecord.electoralAddress.arrivalDate;
        let typeOfHousehold = VoterRecord.electoralAddress.dwellingAddress.typeOfHousehold;
        let dataLock = "false";
        let street = VoterRecord.electoralAddress.dwellingAddress.address.street;
        let postOfficeBoxText = VoterRecord.electoralAddress.dwellingAddress.address.postOfficeBoxText;
        let city = VoterRecord.electoralAddress.dwellingAddress.address.city;
        let swissZipCode = VoterRecord.electoralAddress.dwellingAddress.address.swissZipCode;
        let typeOfResidenceType = VoterRecord.electoralAddress.typeOfResidenceType;
        let voterToPersist = new VotingCitizen(vn, localPersonId, officialName, firstName, sex, dateOfBirth, languageOfCorrespondance, municipality, dataLock, municipality,
        typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold, masterInfluenceList);
        voterList.push(voterToPersist);
        reportingMunicipality = municipality;
        //pass JSON rather then javascript object to hash for simiplified verification with the application return
        const voterHash = new Hash(reportingMunicipality, "voterHash", JSON.parse(JSON.stringify(voterToPersist)));
        voterHashes.push(voterHash);
        await ctx.stub.putState(voterHash.getKey(), Buffer.from(JSON.stringify(voterHash)));
        await ctx.stub.putPrivateData(collection, voterToPersist.getKey(), Buffer.from(JSON.stringify(voterToPersist)));
    }
    const electoralRegisterToPersist = new VoterList(reportingMunicipality, voterList);
    //again pass JSON rather then javascript object to hash for simiplified verification with the application return
    const voterListHash = new Hash(reportingMunicipality, "voterListHash", JSON.parse(JSON.stringify(electoralRegisterToPersist)));
    //also store the voterList in private collection and its hash on the public ledger (external channel)
    await ctx.stub.putState(voterListHash.getKey(), Buffer.from(JSON.stringify(voterListHash)));
    await ctx.stub.putPrivateData(collection, electoralRegisterToPersist.getKey(), Buffer.from(JSON.stringify(electoralRegisterToPersist)));

    console.info('Added voterListHash and individual voter hashes');
    let result = {voterHashes, voterListHash};
    return result;
  }

  async queryWorldState(ctx) {

    //empty string start and end key to fetch all
    const startKey = "";
    const endKey = "";

    const iterator = await ctx.stub.getStateByRange(startKey, endKey);

    let allResults = [];
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

  async queryVoterHash(ctx, voterHashKey) {

    const voterHashAsBytes = await ctx.stub.getState(voterHashKey); // get the citizen from chaincode state type Buffer
    if (!voterHashAsBytes || voterHashAsBytes.length === 0) {
          throw new Error(`${voterHashKey} does not exist`);
    }

    console.log(voterHashAsBytes.toString());
    return voterHashAsBytes.toString();
  }

  async queryVoterListHash(ctx, voterListHashKey) {

    const voterListHashAsBytes = await ctx.stub.getState(voterListHashKey); 
    if (!voterListHashAsBytes || voterListHashAsBytes.length === 0) {
          throw new Error(`${voterListHashKey} does not exist`);
    }

    console.log(voterListHashAsBytes.toString());
    return voterListHashAsBytes.toString();
  }


  async queryVoter(ctx, collection, voterkey) {

    const voterAsBytes = await ctx.stub.getPrivateData(collection, voterkey);
    if (!voterAsBytes || voterAsBytes.length === 0) {
          throw new Error(`${voterkey} does not exist`);
    }

    console.log(voterAsBytes.toString());
    return voterAsBytes.toString();
  }

  async queryVoterList(ctx, collection, voterListKey) {

    const voterListAsBytes = await ctx.stub.getPrivateData(collection, voterListKey);
    if (!voterListAsBytes || voterListAsBytes.length === 0) {
          throw new Error(`${voterListKey} does not exist`);
    }

    console.log(voterListAsBytes.toString());
    return voterListAsBytes.toString();

  }

  // async queryAllVoterListHash(ctx, voterListHashKey) {
  //
  //   const voterListHashAsBytes = await ctx.stub.getPrivateData(collection, voterListHashKey); // get the citizen from chaincode state type Buffer
  //   if (!voterListHashAsBytes || v.length === 0) {
  //         throw new Error(`${voterListHashKey} does not exist`);
  //   }
  //
  //   console.log(voterListHashAsBytes.toString());
  //   return voterListHashAsBytes.toString();
  // }

  async verifyVoter(ctx, voter){


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
