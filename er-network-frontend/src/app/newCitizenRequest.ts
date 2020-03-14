export class NewCitizenRequest {
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
}
