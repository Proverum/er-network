class ResidenceDataType {
  constructor(reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold){
  this.reportingMunicipality = reportingMunicipality;
  this.typeOfResidenceType = typeOfResidenceType; // 1 = Hauptwohnsitz-hasMainResidence 2 =Nebenwohnsitz–hasSecondaryResidence 3= Weder Haupt-noch Nebenwohnsitz–hasOtherResidence
  this.arrivalDate = arrivalDate;
  this.dwellingAddress = new DwellingAddressDataType(street, postOfficeBoxText, city, swissZipCode, typeOfHousehold);
  }
}
module.exports = ResidenceDataType;


class DwellingAddressDataType {
  constructor(street, postOfficeBoxText, city, swissZipCode, typeOfHousehold){
  this.address = new SwissAddressInformationDataType(street, postOfficeBoxText, city, swissZipCode);
  this.typeOfHousehold = typeOfHousehold;  // 1 = Privathaushalt 2 = Kollektivhaushalt 3 = Sammelhaushalt
  }
}
module.exports = DwellingAddressDataType;


class SwissAddressInformationDataType {
  constructor(street, postOfficeBoxText, city, swissZipCode){
  this.street = street;
  this.postOfficeBoxText = postOfficeBoxText;
  this.city = city;
  this.swissZipCode = swissZipCode;
  }
}
module.exports = ResidenceDataType;
