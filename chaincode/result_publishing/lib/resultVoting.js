const State = require('./../ledger-api/state.js');


class ResultVoting extends State {
  constructor(reportingMunicipality, votingId, yesCount, noCount) {
    super(ResultVoting.getClass(), [reportingMunicipality, votingId]);
    this.votingId = votingId;
    this.yes = yesCount;
    this.no = noCount;
  }

  static fromBuffer(buffer) {
      return ResultVoting.deserialize(buffer);
  }

  toBuffer() {
      return Buffer.from(JSON.stringify(this));
  }

  /**
   * Deserialize a state data to citizen
   * @param {Buffer} data to form back into the object
   */
  static deserialize(data) {
      return State.deserializeClass(data, ResultVoting);
  }


  static getClass() {
      return 'er-network.result-voting';
  }
}

module.exports = ResultVoting;
