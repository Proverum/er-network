const State = require('./../ledger-api/state.js');
const ResidenceDataType = require('./residenceDataType');
const PersonDataType = require('./personDataType');

class Citizen extends State {

  constructor(vn, localPersonId, officialName, firstName, dateOfBirth, placeofBirth, sex,
    religion, maritalStatus, nationality, originName, canton, residencePermit,
    reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold) {
        super(Citizen.getClass(), [Citizen.getClass(), reportingMunicipality, vn]);
        this.personData = new PersonDataType(vn, localPersonId, officialName, firstName, dateOfBirth, placeofBirth, sex, religion, maritalStatus, nationality, originName, canton, residencePermit);
        this.MainResidence = new ResidenceDataType(reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold);
        this.SecondaryResidence = "na";
        this.restrictedVoting = "false";
    }

    addSecondaryResidence(reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold) {
        this.SecondaryResidence = new ResidenceDataType(reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold);
    }

    toggleRestrictVoting(){
      if(this.restrictedVoting=="false"){
        this.restrictedVoting = "true";
      }else {
        this.restrictedVoting = "false";
      }
    }

    static fromBuffer(buffer) {
        return Citizen.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to citizen
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, Citizen);
    }


    static getClass() {
        return 'er-network.citizen';
    }
}

module.exports = Citizen;
