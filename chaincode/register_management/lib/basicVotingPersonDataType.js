
class VotingPersonDataType {
  constructor(vn, localPersonId, officialName, firstName, sex, dateOfBirth, languageOfCorrespondance, municipality) {
    this.personIdentificationData = new PersonIdentificationType(vn, localPersonId, officialName, firstName, sex, dateOfBirth);
    this.languageOfCorrespondance = languageOfCorrespondance;
    this.municipality = municipality;
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


module.exports = VotingPersonDataType;
