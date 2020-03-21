const crypto = require('crypto');
const ResidenceDataType = require('./residenceDataType');
const PersonDataType = require('./personDataType');
const Citizen = require('./citizen');
const CitizenPublic = require('./citizenPublic.js');
const VotingCitizen = require('./votingCitizen');
const VoterList = require('./voterListDataType');
const Hash = require('./hash');

var hash = require('object-hash');


var testresi = new Citizen('vn', 'localPersonId', 'officialName', 'firstName', 'dateOfBirth', 'placeofBirth', 'sex',
  'religion', 'maritalStatus', 'nationality', 'originName', 'canton', 'residencePermit',
  'reportingMunicipality', 'typeOfResidenceType', 'arrivalDate', 'street', 'postOfficeBoxText', 'city', 'swissZipCode', 'typeOfHousehold');

// var testvoter = new VotingCitizen('vn', 'localPersonId', 'officialName', 'firstName', 'sex', 'dateOfBirth', 'languageOfCorrespondance', 'municipality', 'dataLock', 'reportingMunicipality',
//   'typeOfResidenceType', 'arrivalDate', 'street', 'postOfficeBoxText', 'city', 'swissZipCode', 'typeOfHousehold', 'CH', '1', 'Bund', 'CT', '1', 'Kanton Zürich', 'MU', '261', 'Stadt Zürich');
//
// var testvoter1 = new VotingCitizen('vn1', 'localPersonId', 'officialName', 'firstName', 'sex', 'dateOfBirth', 'languageOfCorrespondance', 'municipality', 'dataLock', 'reportingMunicipality',
//   'typeOfResidenceType', 'arrivalDate', 'street', 'postOfficeBoxText', 'city', 'swissZipCode', 'typeOfHousehold', 'CH', '1', 'Bund', 'CT', '1', 'Kanton Zürich', 'MU', '261', 'Stadt Zürich');
//
// var testvoter2 = new VotingCitizen('vn2', 'localPersonId', 'officialName', 'firstName', 'sex', 'dateOfBirth', 'languageOfCorrespondance', 'municipality', 'dataLock', 'reportingMunicipality',
//   'typeOfResidenceType', 'arrivalDate', 'street', 'postOfficeBoxText', 'city', 'swissZipCode', 'typeOfHousehold', 'CH', '1', 'Bund', 'CT', '1', 'Kanton Zürich', 'MU', '261', 'Stadt Zürich');
//
// var testvoter3 = new VotingCitizen('vn3', 'localPersonId', 'officialName', 'firstName', 'sex', 'dateOfBirth', 'languageOfCorrespondance', 'municipality', 'dataLock', 'reportingMunicipality',
//   'typeOfResidenceType', 'arrivalDate', 'street', 'postOfficeBoxText', 'city', 'swissZipCode', 'typeOfHousehold', 'CH', '1', 'Bund', 'CT', '1', 'Kanton Zürich', 'MU', '261', 'Stadt Zürich');
//
// var testvoterlist = [testvoter, testvoter1, testvoter2, testvoter3];
// //

console.log(testresi.stringify())

// console.log(testlist);
// console.log("heere comes first the stingified voter then the jsoned voter")
// console.log(testListString);
// var testlistJSON = JSON.parse(testListString);
// console.log(testlistJSON);
//
// console.log(testresi);
// console.log(testvoter4);
//
// var voterlistHash = new Hash(reportingMunicipality, "voterListHash", testlist);
// var voterlistHash2 = new Hash(reportingMunicipality, "voterListHash", testlist);
//
//
// var voterListHash3 = JSON.stringify(testlist);
// var voterListHash4 = JSON.parse(voterListHash3);
//
// console.log(testlist);
// console.log(voterListHash3);
// console.log(voterListHash4);
// console.log(voterListHash4.voter[0].personData);
//
// console.log("hash of the list object " + hash(testlist));
// console.log("hash of the json object " + hash(voterListHash4));

let resultToPublish={
votingId: "voterid",
yes:"4534",
no:"546546"
};

console.log(JSON.stringify(resultToPublish));
// console.log(testvoterJSON.domainOfInfluenceInfo);
// influenceall = testvoterJSON.domainOfInfluenceInfo
// masterInfluenceList = [];
// for (var influence in influenceall) {
//   console.log(influenceall[influence]);
//   influencelist = [];
//   influencelist.push(influenceall[influence].domainOfInfluence);
//   influencelist.push(influenceall[influence].domainOfInfluenceIdentification);
//   influencelist.push(influenceall[influence].domainOfInlfluenceName);
//   console.log(influencelist);
//   masterInfluenceList = masterInfluenceList.concat(influencelist);
// }
// console.log(masterInfluenceList);






//
// console.log(testvoter1);
// console.log("                 sep     ");
// console.log(JSON.stringify(testvoter1));
// console.log("                 sep     ");
// console.log(JSON.parse(JSON.stringify(testvoter1)));
// console.log("                 sep     ");
// console.log(testvoter1.toString('utf8'));
//console.log(list);
