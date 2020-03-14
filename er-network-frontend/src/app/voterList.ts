import { Serializable } from './serializable';

export class VoterList implements Serializable<VoterList>{
  key: string;
  numberOfVoters: number;
  reportingMunicipality: string;
  voter: object[];

  deserialize(input: any) {
    this.key = input.Key;
    this.numberOfVoters = input.Record.numberOfVoters;
    this.reportingMunicipality = input.Record.reportingMunicipality;
    this.voter = input.Record.voter;
    return this;
  }
}
