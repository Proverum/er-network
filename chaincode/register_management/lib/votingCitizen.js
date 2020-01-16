const VotingPersonDataType = require('./basicVotingPersonDataType');
const State = require('./../ledger-api/state.js');
const DomainOfInfluenceDataType = require('./domainOfInfluenceDataType');
const ResidenceDataType = require('./residenceDataType');

//gemäss eCh-0045
class VotingCitizen extends State {
  constructor(vn, localPersonId, officialName, firstName, sex, dateOfBirth, languageOfCorrespondance, municipality, dataLock, reportingMunicipality,
    typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold, ...domainsOfInfluenceArgs) {
    super(VotingCitizen.getClass(), [vn, municipality]);
    this.personData = new VotingPersonDataType(vn, localPersonId, officialName, firstName, sex, dateOfBirth, languageOfCorrespondance, municipality);
    this.dataLock = dataLock;
    this.electoralAddress = new ResidenceDataType(reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold);
    this.deliveryAddress = new ResidenceDataType(reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold);
    this.domainOfInfluenceInfo = [];
    try {
    const chunks = this.chunkArray(domainsOfInfluenceArgs, 3);
    for(const chunk of chunks) {
      const domain = new DomainOfInfluenceDataType(chunk[0], chunk[1], chunk[2]);
      this.domainOfInfluenceInfo.push(domain);
    }
    } catch(error) {
      console.error(error);
    }
  }

  setDeliveryAddress(reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold){
    this.deliveryAddress = new ResidenceDataType(reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold);
  }

  chunkArray(array, chunkSize) {
    return Array.from(
      { length: Math.ceil(array.length / chunkSize) },
      (_, index) => array.slice(index * chunkSize, (index + 1) * chunkSize));
  }

  static fromBuffer(buffer) {
      return VotingCitizen.deserialize(buffer);
  }

  toBuffer() {
      return Buffer.from(JSON.stringify(this));
  }

  /**
   * Deserialize a state data to citizen
   * @param {Buffer} data to form back into the object
   */
  static deserialize(data) {
      return State.deserializeClass(data, VotingCitizen);
  }


  static getClass() {
      return 'er-network.voting-citizen';
  }
}

module.exports = VotingCitizen;
