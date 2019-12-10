const State = require('./../ledger-api/state.js');


class Citizen extends State {

    constructor(obj) {
        super(Citizen.getClass(), [obj.insuranceNr, obj.paperNumber]);
        Object.assign(this, obj);
    }

    /**
     * Basic getters and setters
    */
    getInsuranceNr() {
        return this.insuranceNr;
    }

    setInsuranceNR(newInsuranceNr) {
        this.insuranceNr = newInsuranceNr;
    }

    getMunicipality() {
        return this.municipality;
    }

    setMunicipality(newMunicipality) {
        this.municipality = newMunicipality;
    }

    getBuildingIdentificationNr() {
        return this.buildingIdentificationNr;
    }

    setBuildingIdentificationNr(newBuildingIdentificationNr) {
        this.buildingIdentificationNr = newBuildingIdentificationNr;
    }

    getFlatIdentificationNr() {
        return this.flatIdentificationNr;
    }

    setFlatIdentificationNr(newFlatIdentificationNr) {
        this.flatIdentificationNr = newFlatIdentificationNr;
    }

    getFamilyName() {
        return this.familyName;
    }

    setFamilyName(newFamilyName) {
        this.familyName = newFamilyName;
    }
    // f)
    getName() {
        return this.name;
    }

    setName(newName) {
        this.name = newName;
    }
    //g)
    getAddress() {
        return this.address;
    }

    setAddress(newAddress) {
        this.address = newAddress;
    }
    //h)
    getBirthdate() {
        return this.birthdate;
    }

    setBirthdate(newBrithdate) {
        this.birthdate = newBrithdate;
    }
    //i
    getHometown() {
        return this.hometown;
    }

    setHometown(newHometown) {
        this.hometown = newHometown;
    }
    //j
    getGender() {
        return this.gender;
    }

    setGender(newGender) {
        this.gender = newGender;
    }
    //k
    getCivilStatus() {
        return this.civilStatus;
    }

    setCivilStatus(newCivilStatus) {
        this.civilStatus = neCivilStatus;
    }
    //l
    getReligion() {
        return this.religion;
    }

    setReligion(newReligion) {
        this.religion = newReligion;
    }
    //m
    getCitizenship() {
        return this.citizenship;
    }

    setCitizenship(newCitizenship) {
        this.citizenship = newCitizenship;
    }
    //n
    getForeignIdentification() {
        return this.foreignIdentification;
    }

    setForeignIdentification(newForeignIdentification) {
        this.foreignIdentification = newForeignIdentification;
    }
    //o
    getResidencyStatus() {
        return this.residencyStatus;
    }

    setResidencyStatus(newResidencyStatus) {
        this.residencyStatus = newResidencyStatus;
    }
    //p
    getResidencyMunicipality() {
        return this.residencyMunicipality;
    }

    setResidencyMunicipality(newResidencyMunicipality) {
        this.residencyMunicipality = newResidencyMunicipality;
    }
    //r date and municipality from where the citizen came from
    getMoveInInfo() {
        return this.moveInInfo;
    }

    setMoveInInfo(newMovinInfo) {
        this.moveInInfo = newMovinInfo;
    }
    //s date and municipality  where the citizen went to
    getMoveOutInfo() {
        return this.moveOutInfo;
    }

    getMoveOutInfo(newMoveOutInfo) {
        this.moveOutInfo = newMoveOutInfo;
    }
    //t election rights on federal cantonal and municipal level
    getVotingRights() {
        return this.votingRights;
    }

    setVotingRights(newRights) {
        this.votingRights = newRights;
    }
    //u
    getDeathdate() {
        return this.deathDate;
    }

    setDeathdate(newDeathDate) {
        this.deathDate = newDeathDate;
    }




    static fromBuffer(buffer) {
        return CommercialPaper.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to commercial paper
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, CommercialPaper);
    }

    /**
     * Factory method to create a commercial paper object
     */
    static createInstance(insuranceNr, citizenNumber, municipality,
       buildingIdentificationNr, flatIdentificationNr, familyName, name, address,
       birthdate, hometown,
       gender, civilStatus, religion, citizenship, foreignIdentification, residencyStatus,
       residencyMunicipality, moveInInfo, moveOutInfo, votingRights, deathDate) {
        return new Citizen({ insuranceNr, citizenNumber, municipality,
           buildingIdentificationNr, flatIdentificationNr, familyName, name, address,
           birthdate, hometown,
           gender, civilStatus, religion, citizenship, foreignIdentification, residencyStatus,
           residencyMunicipality, moveInInfo, moveOutInfo, votingRights, deathDate });
    }

    static getClass() {
        return 'er-network.citizen';
    }
}

module.exports = Citizen;
