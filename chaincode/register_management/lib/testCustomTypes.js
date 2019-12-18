const ResidenceDataType = require('./residenceDataType');
const PersonDataType = require('./personDataType');
const Citizen = require('./citizen');

var testresi = new Citizen('vn', 'localPersonId', 'officialName', 'firstName', 'dateOfBirth', 'placeofBirth', 'sex',
  'religion', 'maritalStatus', 'nationality', 'originName', 'canton', 'residencePermit',
  'reportingMunicipality', 'typeOfResidenceType', 'arrivalDate', 'street', 'postOfficeBoxText', 'city', 'swissZipCode', 'typeOfHousehold');

console.log(testresi);
console.log(testresi.personData.personIdentificationData.vn);
