const ResidenceDataType = require('./residenceDataType');
const PersonDataType = require('./personDataType');
const Citizen = require('./citizen');
const CitizenPublic = require('./citizenPublic.js');


var testresi = new Citizen('vn', 'localPersonId', 'officialName', 'firstName', 'dateOfBirth', 'placeofBirth', 'sex',
  'religion', 'maritalStatus', 'nationality', 'originName', 'canton', 'residencePermit',
  'reportingMunicipality', 'typeOfResidenceType', 'arrivalDate', 'street', 'postOfficeBoxText', 'city', 'swissZipCode', 'typeOfHousehold');

var testpublic = new CitizenPublic('vn', 'reportingMunicipality');

console.log(testresi);
console.log(testresi.MainResidence.dwellingAddress.address);
console.log(testpublic);
