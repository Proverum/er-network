const ResidenceDataType = require('./residenceDataType');
const PersonDataType = require('./personDataType');


class TestCitizen{
  constructor(vn, localPersonId, officialName, firstName, dateOfBirth, placeofBirth, sex,
    religion, maritalStatus, nationality, originName, canton, residencePermit,
    reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold) {
    this.personData = new PersonDataType(vn, localPersonId, officialName, firstName, dateOfBirth, placeofBirth, sex,
        religion, maritalStatus, nationality, originName, canton, residencePermit);
    this.hasMainResidence = new ResidenceDataType(reportingMunicipality, typeOfResidenceType, arrivalDate,
        street, postOfficeBoxText, city, swissZipCode, typeOfHousehold);
  }
}
var testresi = new TestCitizen('vn', 'localPersonId', 'officialName', 'firstName', 'dateOfBirth', 'placeofBirth', 'sex',
  'religion', 'maritalStatus', 'nationality', 'originName', 'canton', 'residencePermit',
  'reportingMunicipality', 'typeOfResidenceType', 'arrivalDate', 'street', 'postOfficeBoxText', 'city', 'swissZipCode', 'typeOfHousehold')

console.log(testresi);
