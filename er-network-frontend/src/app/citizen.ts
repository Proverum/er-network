import { Serializable } from './serializable';

export class Citizen implements Serializable<Citizen>{
  vn: string;
  localPersonId: string = "StubId";
  officialName: string;
  firstName: string;
  dateOfBirth: string;
  placeOfBirth: string = "Stubplace";
  sex: string = "Stubsex";
  religion: string = "Stubreligion";
  maritalStatus: string = "Stubsingle";
  nationality: string;
  originName: string = "StubOrigin";
  canton: string = "Stubcanton";
  residencePermit: string = "Stubpermit";
  reportingMunicipality: string;
  typeOfResidenceType: string;
  arrivalDate: string = "Stubdate";
  street: string = "StubStreet";
  postOfficeBoxText: string = "Stubpostbox";
  city: string = "Stubcity";
  swissZipCode: string = "StubZipCode";
  typeOfHousehold: string = "typeOfHousehold";
  collection: string;
  citizenKey: string;

  deserialize(input: any) {
    this.citizenKey = input.Key;
    this.vn = input.Record.personData.personIdentificationData.vn;
    this.localPersonId = input.Record.personData.personIdentificationData.localPersonId;
    this.officialName = input.Record.personData.personIdentificationData.officialName;
    this.firstName = input.Record.personData.personIdentificationData.firstName;
    this.dateOfBirth = input.Record.personData.personIdentificationData.dateOfBirth;
    this.placeOfBirth = input.Record.personData.birthData.placeofBirth;
    this.sex = input.Record.personData.birthData.sex;
    this.religion = input.Record.personData.religion;
    this.maritalStatus = input.Record.personData.maritalStatus;
    this.nationality = input.Record.personData.nationality;
    this.originName = input.Record.personData.placeOfOrigin.originName;
    this.canton = input.Record.personData.placeOfOrigin.canton;
    this.residencePermit = input.Record.personData.residencePermit;
    this.reportingMunicipality = input.Record.MainResidence.reportingMunicipality;
    this.typeOfResidenceType = input.Record.MainResidence.typeOfResidenceType;
    this.arrivalDate = input.Record.MainResidence.arrivalDate;
    this.street = input.Record.MainResidence.dwellingAddress.address.street;
    this.postOfficeBoxText = input.Record.MainResidence.dwellingAddress.address.postOfficeBoxText;
    this.city = input.Record.MainResidence.dwellingAddress.address.city;
    this.swissZipCode = input.Record.MainResidence.dwellingAddress.address.swissZipCode;
    this.typeOfHousehold = input.Record.MainResidence.dwellingAddress.typeOfHousehold;
    this.collection = "";
    return this;
  }
}
