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

var testvoter = new VotingCitizen('vn', 'localPersonId', 'officialName', 'firstName', 'sex', 'dateOfBirth', 'languageOfCorrespondance', 'municipality', 'dataLock', 'reportingMunicipality',
  'typeOfResidenceType', 'arrivalDate', 'street', 'postOfficeBoxText', 'city', 'swissZipCode', 'typeOfHousehold', 'CH', '1', 'Bund', 'CT', '1', 'Kanton Zürich', 'MU', '261', 'Stadt Zürich');

var testvoter1 = new VotingCitizen('vn1', 'localPersonId', 'officialName', 'firstName', 'sex', 'dateOfBirth', 'languageOfCorrespondance', 'municipality', 'dataLock', 'reportingMunicipality',
  'typeOfResidenceType', 'arrivalDate', 'street', 'postOfficeBoxText', 'city', 'swissZipCode', 'typeOfHousehold', 'CH', '1', 'Bund', 'CT', '1', 'Kanton Zürich', 'MU', '261', 'Stadt Zürich');

var testvoter2 = new VotingCitizen('vn2', 'localPersonId', 'officialName', 'firstName', 'sex', 'dateOfBirth', 'languageOfCorrespondance', 'municipality', 'dataLock', 'reportingMunicipality',
  'typeOfResidenceType', 'arrivalDate', 'street', 'postOfficeBoxText', 'city', 'swissZipCode', 'typeOfHousehold', 'CH', '1', 'Bund', 'CT', '1', 'Kanton Zürich', 'MU', '261', 'Stadt Zürich');

var testvoter3 = new VotingCitizen('vn3', 'localPersonId', 'officialName', 'firstName', 'sex', 'dateOfBirth', 'languageOfCorrespondance', 'municipality', 'dataLock', 'reportingMunicipality',
  'typeOfResidenceType', 'arrivalDate', 'street', 'postOfficeBoxText', 'city', 'swissZipCode', 'typeOfHousehold', 'CH', '1', 'Bund', 'CT', '1', 'Kanton Zürich', 'MU', '261', 'Stadt Zürich');

// var testvoterlist = [testvoter, testvoter1, testvoter2, testvoter3];
//
// var testlist = new VoterList('Zürich', testvoterlist);
//
// var testdate = new Date('1950/07/01');
var influence = ['CH', '1', 'Bund'];
influence = influence.concat(['CT', '1', 'Kanton Zürich', 'MU', '261', 'Stadt Zürich']);

var testvoter4 = new VotingCitizen('vn3', 'localPersonId', 'officialName', 'firstName', 'sex', 'dateOfBirth', 'languageOfCorrespondance', 'municipality', 'dataLock', 'reportingMunicipality',
  'typeOfResidenceType', 'arrivalDate', 'street', 'postOfficeBoxText', 'city', 'swissZipCode', 'typeOfHousehold', influence);

let reportingMunicipality = testvoter4.electoralAddress.reportingMunicipality;

let voterHash = new Hash(reportingMunicipality, "voterHash", testvoter4);

let voterListKey = reportingMunicipality.concat(JSON.stringify(new Date()));

console.log(voterListKey)




//
// console.log(testvoter1);
// console.log("                 sep     ");
// console.log(JSON.stringify(testvoter1));
// console.log("                 sep     ");
// console.log(JSON.parse(JSON.stringify(testvoter1)));
// console.log("                 sep     ");
// console.log(testvoter1.toString('utf8'));
//console.log(list);
