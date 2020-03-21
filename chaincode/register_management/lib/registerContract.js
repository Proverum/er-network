'use strict';

const { Contract, Context } = require('fabric-contract-api');
const shim = require('fabric-shim');
const util = require('util');
var hash = require('object-hash');


const Citizen = require('./citizen.js');
const VotingCitizen = require('./votingCitizen.js');
const VoterList = require('./voterListDataType.js');
const Hash = require('./hash.js');
const ClientIdentity = require('fabric-shim').ClientIdentity;


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

  //Menzingen example with a bunch of mock citizens
  async initLedgerMunicipality(ctx) {

    const cid = new ClientIdentity(ctx.stub);
    const invokingMSP = cid.getMSPID();

    if(invokingMSP=='MunicipalityMSP'){
      console.info('============= START : Initialize Ledger ===========');
      //some dummy citizens to work with municiplaity zürich
      let citizens = [new Citizen('7567888567111', 'CH.AUPER.12345567', 'Spähni', 'Peter', '1980/05/18', 'Zuerich', 'männlich',
        ' evangelisch-reformierte Kirche', 'verheirated', 'Schweiz', 'Menzingen', 'Zug', 'na',
        'Menzingen', 'Hauptwohnsitz', '22.05.1970', 'Bergstrasse 90', '8 15', 'Menzingen', '8002', 'Kollektivhaushalt'),
        new Citizen('7569933367111', 'CH.VERA.5466525', 'Rauper', 'Sandra', '2010/03/26', 'Menzingen', 'weiblich',
          'römisch-katholische Kirche', 'ledig', 'Schweiz', 'Menzingen', 'Zug', 'na',
          'Menzingen', 'Hauptwohnsitz', '06.09.2010', 'Bahnhofstrasse 55', '234', 'Menzingen', '8003', 'Privathaushalt'),
        new Citizen('7562659123111', 'CH.VERA.45254435', 'Muster', 'Max', '1950/07/01', 'Menzingen', 'männlich',
          'Jüdisch Liberale Gemeinde', 'geschieden', 'Schweiz', 'Adliswil', 'Zürich', 'na',
          'Menzingen', 'Hauptwohnsitz', '06.09.2010', 'Aegertenstrasse 77', '9283', 'Menzingen', '8003', 'Privathaushalt'),

      ];

      //add citizens to private data store
      for (let i = 0; i < citizens.length; i++) {
          await ctx.stub.putPrivateData( "collectionCitizenMunicipality", citizens[i].personData.personIdentificationData.vn, Buffer.from(JSON.stringify(citizens[i])));
          console.info('Added <--> ', citizens[i]);
      }
    }
    else {
      throw new Error("Only the Municipality1 is allowed to publish results through this function call however you are identified as ", invokingMSP);
    }
    console.info('============= END : Initialize Ledger Municipality ===========');
  }


  //Risch example with a bunch of mock citizens
  async initLedgerMunicipalityTwo(ctx) {

    const cid = new ClientIdentity(ctx.stub);
    const invokingMSP = cid.getMSPID();

    if(invokingMSP=='Municipality2MSP'){
      console.info('============= START : Initialize Ledger ===========');
      //some dummy citizens to work with municipality bassersdorf
      let citizens = [new Citizen('7567888567222', 'CH.AUPER.123298367', 'Laubi', 'Johan', '1988/02/12', 'Baar', 'männlich',
        ' evangelisch-reformierte Kirche', 'verheirated', 'Schweiz', 'Baar', 'Zug', 'na',
        'Risch', 'Hauptwohnsitz', '22.09.1980', 'Basserstrasse 78', '8879', 'Risch', '8303', 'Kollektivhaushalt'),
        new Citizen('756993332222', 'CH.VERA.923411', 'Lehner', 'Jasmin', '20057/08/05', 'Zuerich', 'weiblich',
          'römisch-katholische Kirche', 'ledig', 'Schweiz', 'Horgen', 'Zuerich', 'na',
          'Risch', 'Hauptwohnsitz', '06.06.2008', 'Hinterweg 43', '78984', 'Risch', '8303', 'Privathaushalt'),
        new Citizen('7566666444222', 'CH.ZAR.78342', 'Gonzalez', 'Jorge', '1990/03/25', 'Madrid', 'männlich',
          'römisch-katholische Kirche', 'ledig', 'Spanien', 'Madrid', 'na', 'B',
          'Risch', 'Hauptwohnsitz', '02.10.2011', 'Hautstrasse 1', '234', 'Risch', '8303', 'Privathaushalt'),

      ];
      //add citizens to private data store
      for (let i = 0; i < citizens.length; i++) {
          await ctx.stub.putPrivateData( "collectionCitizenMunicipalityTwo", citizens[i].personData.personIdentificationData.vn, Buffer.from(JSON.stringify(citizens[i])));
          console.info('Added <--> ', citizens[i]);
      }
    }
    else {
      throw new Error("Only the Municipality2 is allowed to publish results through this function call however you are identified as ", invokingMSP);
    }
    console.info('============= END : Initialize Ledger Municipality Two ===========');
  }

  //Wallisellen example with a bunch of mock citizens
  async initLedgerMunicipalityThree(ctx) {

    const cid = new ClientIdentity(ctx.stub);
    const invokingMSP = cid.getMSPID();

    if(invokingMSP=='Municipality3MSP'){
      console.info('============= START : Initialize Ledger ===========');
      //dummy citizens for wallisellen example
      let citizens = [new Citizen('7566662109333', 'SuisseId.02', 'Johnson', 'Mike', '1979/09/09', 'Seattle', 'männlich',
        ' evangelisch-reformierte Kirche', 'verheirated', 'USA', 'New York', 'na', 'A',
        'Wallisellen', 'Hauptwohnsitz', '22.09.2003', 'Wallisellerstrasse 78', '123', 'Wallisellen', '8304', 'Kollektivhaushalt'),
        new Citizen('756456713333', 'CH.INFOSTAR.235453', 'Rand', 'Alf', '1992/08/17', 'Zuerich', 'männlich',
          'römisch-katholische Kirche', 'ledig', 'Schweiz', 'Davos', 'Graubünden', 'na',
          'Wallisellen', 'Nebenwohnsitz', '06.06.2013', 'Hügelweg 10', '11', 'Wallisellen', '8304', 'Sammelhaushalt'),
        new Citizen('7565544294333', 'CH.VERA.263453', 'Schwab', 'Lena', '1982/06/04', 'Altdorf', 'weiblich',
          'israelitische Gemeinschaft / jüdische Glaubensgemeinschaft', 'verheiratet', 'Schweiz', 'Altdorf', 'Uri', 'na',
          'Wallisellen', 'Hauptwohnsitz', '09.08.2015', 'Usterstrasse 9b', '192', 'Wallisellen', '8304', 'Privathaushalt'),
      ];

      //add public information to corresponding canton and confederation
      for (let i = 0; i < citizens.length; i++) {
          await ctx.stub.putPrivateData( "collectionCitizenMunicipalityThree", citizens[i].personData.personIdentificationData.vn, Buffer.from(JSON.stringify(citizens[i])));
          console.info('Added <--> ', citizens[i]);
      }
    }
    else {
      throw new Error("Only the Municipality3 is allowed to publish results through this function call however you are identified as ", invokingMSP);
    }
    console.info('============= END : Initialize Ledger Municipality Three===========');
  }

  //Dübendorf example with a bunch of mock citizens
  async initLedgerMunicipalityFour(ctx) {

    const cid = new ClientIdentity(ctx.stub);
    const invokingMSP = cid.getMSPID();

    if(invokingMSP=='Municipality4MSP'){
      console.info('============= START : Initialize Ledger ===========');
      //dummy citizens wallisellen Dübenforf
      let citizens = [new Citizen('756626210444', 'CH:AUPER', 'Flack', 'Doris', '1975/05/021', 'Cham', 'männlich',
        ' evangelisch-reformierte Kirche', 'verheirated', 'Schweiz', 'Cham', 'na', 'A',
        'Dübendorf', 'Hauptwohnsitz', '22.09.2003', 'Dübenerstrasse 1a', '0045', 'Dübendorf', '8600', 'Kollektivhaushalt'),
        new Citizen('7564528634444', 'CH.INFOSTAR.235453', 'Topfer', 'Tom', '1992/08/17', 'Zuerich', 'männlich',
          'römisch-katholische Kirche', 'ledig', 'Schweiz', 'Davos', 'Graubünden', 'na',
          'Dübendorf', 'Hauptwohnsitz', '06.06.2013', 'Hügelweg 10', '11', 'Dübendorf', '8600', 'Sammelhaushalt'),
        new Citizen('7565534984444', 'CH.VERA.263453', 'Sutskever', 'Nina', '1982/06/04', 'Altdorf', 'weiblich',
          'israelitische Gemeinschaft / jüdische Glaubensgemeinschaft', 'verheiratet', 'Schweiz', 'Altdorf', 'Uri', 'na',
          'Dübendorf', 'Hauptwohnsitz', '09.08.2015', 'Usterstrasse 9b', '192', 'Dübendorf', '8600', 'Privathaushalt'),
      ];

      //add public information to corresponding canton and confederation
      for (let i = 0; i < citizens.length; i++) {
          await ctx.stub.putPrivateData( "collectionCitizenMunicipalityFour", citizens[i].personData.personIdentificationData.vn, Buffer.from(JSON.stringify(citizens[i])));
          console.info('Added <--> ', citizens[i]);
      }
    }
    else {
      throw new Error("Only the Municipality4 is allowed to publish results through this function call however you are identified as ", invokingMSP);
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

  //not really needed

  // async getCitizensByRange(ctx, startKey, endKey, collection) {
  //
  //   let iterator = await ctx.stub.getPrivateDataByRange(collection, startKey, endKey);
  //
  //   let allResults = [];
  //   while (true) {
  //       let res = await iterator.next();
  //
  //       if (res.value && res.value.value.toString()) {
  //           console.log(res.value.value.toString('utf8'));
  //
  //           const Key = res.value.key;
  //           let Record;
  //           try {
  //               Record = JSON.parse(res.value.value.toString('utf8'));
  //           } catch (err) {
  //               console.log(err);
  //               Record = res.value.value.toString('utf8');
  //           }
  //           allResults.push({ Key, Record });
  //       }
  //       if (res.done) {
  //           console.log('end of data');
  //           await iterator.close();
  //           console.info(allResults);
  //           return Buffer.from(JSON.stringify(allResults));
  //       }
  //   }
  // }

// kind of similar to get all private data from collection x
  async getAllCitizens(ctx, collection) {

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

  async getAllVoters(ctx, collection) {

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

  //would be needed for futher genric features
  // async updateCitizen(ctx, collection, citizenkey, newkey) {
  //
  //   const citizenAsBytes = await ctx.stub.getPrivateData(collection, citizenkey); // get the citizen from chaincode state type Buffer
  //   if (!citizenAsBytes || v.length === 0) {
  //         throw new Error(`${voterkey} does not exist`);
  //   }
  //
  //   const citizen = JSON.parse(citizenAsBytes.toString());
  //   const personData = citizen.personData;
  //   citizen.key = newkey;
  //
  //   await ctx.stub.putState(newkey, Buffer.from(JSON.stringify(citizen)));
  //   console.info('============= END : changeCarOwner ===========');
  // }

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

            const key = res.value.key;
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
                  typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold, influence, key);
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
        let keyFull = electoralRegisterObject[i].key;
        //keep the citizenkey to build a composite hash key later on
        let key = keyFull.slice(6);
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
        typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold, masterInfluenceList, key);
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


  async queryVoter(ctx, collection, voterKey) {

    const voterAsBytes = await ctx.stub.getPrivateData(collection, voterKey);
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

  async verifyVoter(ctx, collection, voterKey){

    const voterAsBytes = await ctx.stub.getPrivateData(collection, voterKey);
    if (!voterAsBytes || voterAsBytes.length === 0) {
          throw new Error(`${voterkey} does not exist`);
    }

    // again super ugly workaround cause of desarialization issues...
    const VoterRecord = JSON.parse(citizenAsBytes.toString());
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
    let voter = new VotingCitizen(vn, localPersonId, officialName, firstName, sex, dateOfBirth, languageOfCorrespondance, municipality, dataLock, municipality,
    typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold, masterInfluenceList, key);
    const voterHash = new Hash(municipality, "voterHash", JSON.parse(JSON.stringify(voter)));

    let voterHashKey = "voterHash"+voter.personData.municipality+voter.key;

    const voterHashAsBytes = await ctx.stub.getState(voterHashKey); // get the car from chaincode state
    if (!voterHashAsBytes || voterHashAsBytes.length === 0) {
        throw new Error(`${voterHashKey} does not exist`);
    }
    const voterHashObject = JSON.parse(voterHashAsBytes.toString());
    publicVoterHash = voterHashObject.contentHash;

    if (publicVoterHash==voterHash) {
        return JSON.stringify((true, voterHash, publicVoterHash))
    } else {
        return JSON.stringify((false, voterHash, publicVoterHash))
    }

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

  //does not work as reading and writing private data in the same method is not possible in fabric
  // async moveCitizen(ctx, collectionOrigin, collectionDestination, citizenkey) {
  //
  //   const citizenAsBytes = await ctx.stub.getPrivateData(collectionOrigin, citizenkey); // get the citizen from chaincode state type Buffer
  //   if (!citizenAsBytes || citizenAsBytes.length === 0) {
  //         throw new Error(`${citizenkey} does not exist`);
  //   }
  //   const citizen = JSON.parse(citizenAsBytes.toString().toString('utf8'));
  //   const Key = citizen.personData.personIdentificationData.vn;
  //
  //   await ctx.stub.putPrivateData(collectionDestination, Key, Buffer.from(JSON.stringify(citizen)));
  //   console.info('============= END : move Citizen ===========');
  //
  // }


//contract end braces
}

module.exports=RegisterContract;
