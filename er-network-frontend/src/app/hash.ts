import { Serializable } from './serializable';

export class Hash implements Serializable<Hash>{
  key: string;
  reportingMunicipality: string;
  contentType: string;
  timestamp: string;
  contentHash: string;

  deserialize(input: any) {
    this.key = input.Key;
    this.reportingMunicipality = input.Record.reportingMunicipality;
    this.contentType = input.Record.contentType;
    this.timestamp = input.Record.timestamp;
    this.contentHash = input.Record.contentHash;
    return this;

  }
}
