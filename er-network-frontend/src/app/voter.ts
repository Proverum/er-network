import { Serializable } from './serializable';

export class Voter implements Serializable<Voter>{
  key: string;
  vn: string;
  localPersonId: string;
  officialName: string;
  firstName: string;
  sex: string;
  dateOfBirth: string;
  languageOfCorrespondance: string;
  municipality: string;
  dataLock: string;
  reportingMunicipality: string;
  typeOfResidenceType: string;
  arrivalDate: string;
  street: string;
  postOfficeBoxText: string;
  city: string;
  swissZipCode: string;
  typeOfHousehold: string;
  domainsOfInfluenceArgs: object[];

  deserialize(input: any) {
    this.key = input.Key;
    this.vn = input.Record.personData.personIdentificationData.vn;
    this.localPersonId = input.Record.personData.personIdentificationData.localPersonId;
    this.officialName = input.Record.personData.personIdentificationData.officialName;
    this.firstName = input.Record.personData.personIdentificationData.firstName;
    this.sex = input.Record.personData.personIdentificationData.sex;
    this.dateOfBirth = input.Record.personData.personIdentificationData.dateOfBirth;
    this.languageOfCorrespondance = input.Record.personData.languageOfCorrespondance;
    this.municipality = input.Record.personData.municipality;
    this.dataLock = input.dataLock;
    this.reportingMunicipality = input.Record.electoralAddress.reportingMunicipality;
    this.typeOfResidenceType = input.Record.electoralAddress.typeOfResidenceType;
    this.arrivalDate = input.Record.electoralAddress.arrivalDate;
    this.street = input.Record.electoralAddress.dwellingAddress.address.street;
    this.postOfficeBoxText = input.Record.electoralAddress.dwellingAddress.address.postOfficeBoxText;
    this.city = input.Record.electoralAddress.dwellingAddress.address.city;
    this.swissZipCode = input.Record.electoralAddress.dwellingAddress.address.swissZipCode;
    this.typeOfHousehold = input.Record.electoralAddress.dwellingAddress.postOfficeBoxText;
    this.domainsOfInfluenceArgs = input.Record.domainsOfInfluenceArgs;
    return this;
  }
}
