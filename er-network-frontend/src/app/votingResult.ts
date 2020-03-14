import { Serializable } from './serializable';

export class VotingResult implements Serializable<VotingResult>{
  make: string;
  model: string;
  licenseplate: string;
  id: string;

  deserialize(input: any) {
    this.make = input.state.data.make;
    this.model = input.state.data.model;
    this.licenseplate = input.state.data.licenseplate;
    this.id = input.state.data.linearId.id;
    return this;
  }
}
