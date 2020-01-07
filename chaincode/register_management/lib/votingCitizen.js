class VotingCitizen extends State {

  constructor(vn, localPersonId, officialName, firstName, dateOfBirth, placeofBirth, sex,
    religion, maritalStatus, nationality, originName, canton, residencePermit,
    reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold) {
        super(VotingCitizen.getClass(), [vn, reportingMunicipality]);
        this.personData = new PersonDataType(vn, localPersonId, officialName, firstName, dateOfBirth, placeofBirth, sex, religion, maritalStatus, nationality, originName, canton, residencePermit);
        this.MainResidence = new ResidenceDataType(reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold);
        this.SecondaryResidence = 'na';
    }

    static addSecondaryResidence(reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold) {
        this.SecondaryResidence = new ResidenceDataType(reportingMunicipality, typeOfResidenceType, arrivalDate, street, postOfficeBoxText, city, swissZipCode, typeOfHousehold);
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
        return 'er-network.citizen';
    }
}

module.exports = VotingCitizen;
