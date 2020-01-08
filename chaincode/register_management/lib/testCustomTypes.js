const ResidenceDataType = require('./residenceDataType');
const PersonDataType = require('./personDataType');
const Citizen = require('./citizen');
const CitizenPublic = require('./citizenPublic.js');
const VotingCitizen = require('./votingCitizen');


var testresi = new Citizen('vn', 'localPersonId', 'officialName', 'firstName', 'dateOfBirth', 'placeofBirth', 'sex',
  'religion', 'maritalStatus', 'nationality', 'originName', 'canton', 'residencePermit',
  'reportingMunicipality', 'typeOfResidenceType', 'arrivalDate', 'street', 'postOfficeBoxText', 'city', 'swissZipCode', 'typeOfHousehold');

var testpublic = new VotingCitizen('vn', 'localPersonId', 'officialName', 'firstName', 'sex', 'dateOfBirth', 'languageOfCorrespondance',
'municipality', 'dataLock', 'electoralAddress', 'CH', '1', 'Bund', 'CT', '1', 'Kanton Zürich', 'MU', '261', 'Stadt Zürich');

// console.log(testresi);
// console.log(testresi.MainResidence.dwellingAddress.address);
console.log(testpublic);
