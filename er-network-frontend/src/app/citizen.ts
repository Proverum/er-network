import { Serializable } from './serializable';

export class Citizen implements Serializable<Citizen>{
  key: string;
  vn: string;
  localPersonId: string;
  officialName: string;
  firstName: string;
  dateOfBirth: string;
  placeofBirth: string;
  sex: string;
  religion: string;
  maritalStatus: string;
  nationality: string;
  originName: string;
  canton: string;
  residencePermit: string;
  reportingMunicipality: string;
  typeOfResidenceType: string;
  arrivalDate: string;
  street: string;
  postOfficeBoxText: string;
  city: string;
  swissZipCode: string;
  typeOfHousehold: string;

  deserialize(input: any) {
    this.key = input.Key;
    this.vn = input.Record.personData.personIdentificationData.vn;
    this.localPersonId = input.Record.personData.personIdentificationData.localPersonId;
    this.officialName = input.Record.personData.personIdentificationData.officialName;
    this.firstName = input.Record.personData.personIdentificationData.firstName;
    this.dateOfBirth = input.Record.personData.personIdentificationData.dateOfBirth;
    this.placeofBirth = input.Record.personData.birthData.placeofBirth;
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
    this.typeOfHousehold = input.Record.MainResidence.dwellingAddress.postOfficeBoxText;
    return this;
  }
}
