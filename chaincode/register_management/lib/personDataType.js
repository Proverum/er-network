
class PersonDataType {
  constructor(vn, localPersonId, officialName, firstName, dateOfBirth, placeofBirth, sex, religion, maritalStatus, nationality, originName, canton, residencePermit) {
    this.personIdentificationData = new PersonIdentificationType(vn, localPersonId, officialName, firstName, sex, dateOfBirth);
    this.nameData = new NameDataType(officialName, firstName);
    this.birthData = new BirthDataType(dateOfBirth, placeofBirth, sex);
    this.religion = religion;
    this.maritalStatus = maritalStatus;
    this.nationality = nationality;
    this.placeOfOrigin = new PlaceOfOriginDataType(originName, canton);
    this.residencePermit = residencePermit;
  }
}

class PersonIdentificationType {
  constructor(vn, localPersonId, officialName, firstName, sex, dateOfBirth) {
    this.vn = vn;
    this.localPersonId = localPersonId;
    this.officialName = officialName;
    this.firstName = firstName;
    this.sex = sex;
    this.dateOfBirth = dateOfBirth;
  }
}

class NameDataType {
  constructor(officialName, firstName) {
    this.officialName = officialName;
    this.firstName = firstName;
  }
}


class BirthDataType {
  constructor(dateOfBirth, placeofBirth, sex){
  this.dateOfBirth = dateOfBirth;
  this.placeofBirth = placeofBirth;
  this.sex = sex;
  }
}

class NationalityDataType {
  constructor(nationalityStatus, country) {
  this.nationalityStatus = nationalityStatus;
  this.country = country;
  }
}

class PlaceOfOriginDataType {
  constructor(originName, canton){
  this.originName = originName;
  this.canton = canton;
  }
}

module.exports = PersonDataType;
