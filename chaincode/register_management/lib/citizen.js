const State = require('./../ledger-api/state.js');
const PersonType = require('./dataTypes');
const PersonIdentificationType = require('./dataTypes');
const BirthDataType = require('./dataTypes');
const NationalityDataType = require('./dataTypes');
const PlaceOfOriginDataType = require('./dataTypes');
const ResidenceDataType = require('./dataTypes');
const DwellingAddressDataType = require('./dataTypes');
const SwissAddressInformationDataType = require('./dataTypes');

require('./dataTypes');

class Citizen extends State {

  constructor(vn, localPersonId, officialName, firstName, dateOfBirth, placeofBirth, sex, religion, maritalStatus, nationality, originName,
    canton, reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold){
      this.vn = vn;
      this.localPersonId = localPersonId;
      this.officialName = officialName;
      this.firstName = firstName;
      this.dateOfBirth = dateOfBirth;
      this.sex = sex;
      this.religion = religion;
      this.maritalStatus = maritalStatus;
      this.nationality = nationality;
      this.originName = originName
  }


    /**
     * Basic getters and setters
    */
    getPersonData() {
        return this.personData;
    }

    setPersonData(newPersonData) {
        this.personData = newPersonData;
    }

    getMainResidence() {
        return this.hasMainResidence;
    }

    setMainResidence(newMainResidence) {
        this.hasMainResidence = newMainResidence;
    }

    getSecondaryResidence() {
        return this.hasSecondaryResidence;
    }

    setSecondaryResidence(newSecondaryResidence) {
        this.hasSecondaryResidence = newSecondaryResidence;
    }

    getOtherResidence() {
        return this.hasOtherResidence;
    }

    setOtherResidence(newOtherResidence) {
        this.hasOtherResidence = newOtherResidence;
    }



    static fromBuffer(buffer) {
        return Citizen.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to commercial paper
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, Citizen);
    }

    /**
     * Factory method to create a commercial paper object
     */


    static getClass() {
        return 'er-network.citizen';
    }
}

module.exports = Citizen;
