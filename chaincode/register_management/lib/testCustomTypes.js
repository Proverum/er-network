const ResidenceDataType = require('./residenceDataType');
const PersonDataType = require('./personDataType');
const Citizen = require('./citizen');
const CitizenPublic = require('./citizenPublic.js');
const VotingCitizen = require('./votingCitizen');
const VoterList = require('./voterListDataType');



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

var testvoterlist = [testvoter, testvoter1, testvoter2, testvoter3];

var testlist = new VoterList('Zürich', testvoterlist);

var testdate = new Date('1950/07/01');
var influence = ['CH', '1', 'Bund'];
influence = influence.concat(['CT', '1', 'Kanton Zürich', 'MU', '261', 'Stadt Zürich']);

let today = new Date();
let birthDate = new Date('1950/07/01');
let age = today.getFullYear() - birthDate.getFullYear();
let m = today.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
}

keyparts = ["muni", "8q1515"];

console.log(testlist);
console.log(keyparts.map(part => JSON.stringify(part)).join(':'));
console.log(testresi);
console.log(testresi.personData.nameData.firstName);
console.log(testresi.personData.nameData.officialName);
