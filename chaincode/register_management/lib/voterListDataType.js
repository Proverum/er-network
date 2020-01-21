const VotingPersonDataType = require('./basicVotingPersonDataType');
const State = require('./../ledger-api/state.js');
const VotingCitizen = require('./votingCitizen');

class VoterList extends State {
  constructor(reportingMunicipality, votersArgs) {
    super(VoterList.getClass(), [VoterList.getClass(), reportingMunicipality]);
    this.reportingMunicipality = reportingMunicipality;
    this.numberOfVoters = votersArgs.length;
    this.cuurentState = "valid";
    this.voter = [];
    console.log(votersArgs);
    try {
    for(var i in votersArgs) {
      console.log(votersArgs[i]);
      this.voter.push(votersArgs[i]);
    }
    } catch(error) {
      console.error(error);
    }
  }

  static fromBuffer(buffer) {
      return VoterList.deserialize(buffer);
  }

  toBuffer() {
      return Buffer.from(JSON.stringify(this));
  }

  /**
   * Deserialize a state data to citizen
   * @param {Buffer} data to form back into the object
   */
  static deserialize(data) {
      return State.deserializeClass(data, VoterList);
  }


  static getClass() {
      return 'voterlist';
  }
}

module.exports = VoterList;
