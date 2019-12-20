const State = require('./../ledger-api/state.js');
const ResidenceDataType = require('./residenceDataType');
const PersonDataType = require('./personDataType');

class CitizenPublic extends State {

  constructor(vn, reportingMunicipality) {
        super(CitizenPublic.getClass(), [vn, reportingMunicipality]);
        this.vn = vn;
        this.reportingMunicipality = reportingMunicipality;
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
        return State.deserializeClass(data, CitizenPublic);
    }


    static getClass() {
        return 'er-network.citizen-public';
    }
}

module.exports = CitizenPublic;
