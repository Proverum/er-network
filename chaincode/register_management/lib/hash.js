const State = require('./../ledger-api/state.js');
var hash = require('object-hash');



class Hash extends State {
  constructor(reportingMunicipality, contentType, contentToHash) {
    super(Hash.getClass(), [contentType, reportingMunicipality, new Date()]);
    this.reportingMunicipality = reportingMunicipality;
    this.contentType = contentType;
    this.timestamp = new Date();
    this.contentHash = hash(contentToHash);
  }

  static fromBuffer(buffer) {
      return Hash.deserialize(buffer);
  }

  toBuffer() {
      return Buffer.from(JSON.stringify(this));
  }

  /**
   * Deserialize a state data to citizen
   * @param {Buffer} data to form back into the object
   */
  static deserialize(data) {
      return State.deserializeClass(data, Hash);
  }


  static getClass() {
      return 'er-network.hash';
  }
}

module.exports = Hash;
