const { Contract, Context } = require('fabric-contract-api');
const shim = require('fabric-shim');
const util = require('util');
const ClientIdentity = require('fabric-shim').ClientIdentity;
ResultVoting  = require('./resultVoting.js');


class PublishingContract extends Contract {

  constructor() {
    // Unique name when multiple contracts per chaincode file
    super('er-network.publishcontract');
  }

  async instantiate(ctx) {
    // No implementation required with this example
    // It could be where data migration is performed, if necessary
    console.log('Instantiate the contract');
  }

  async publishMunicipalityVotingResult(ctx,reportingMunicipality, votingId, yesCount, noCount) {

    const cid = new ClientIdentity(ctx.stub);
    const invokingMSP = cid.getMSPID();
    // only municipaliteis are allowed to publish with this and create an according event
    if(invokingMSP=='MunicipalityMSP' || invokingMSP=='Municipality2MSP' || invokingMSP=='Municipality3MSP'){
      const resultToPublish = new ResultVoting(reportingMunicipality, votingId, yesCount, noCount);
      const resultKey = votingId+":"+reportingMunicipality;
      await ctx.stub.putState(resultKey, Buffer.from(JSON.stringify(resultToPublish)));


      // define and set publisheventEvent
      const eventKey = reportingMunicipality+":"+'PublishMunicipalityEvent';
      const votingResultEvent = {
          type: eventKey,
          votingId: votingId,
          yes: yesCount,
          no: noCount,
      };
      await ctx.stub.setEvent(eventKey, Buffer.from(JSON.stringify(votingResultEvent)));
      return {resultKey, resultToPublish, votingResultEvent, invokingMSP};

    } else {
      throw new Error("Only Municipalities are allowed to publish results through this function call");
    }

  }

  async queryMunicipalityResult(ctx, resultKey) {
      const resultAsBytes = await ctx.stub.getState(resultKey); // get the car from chaincode state
      if (!resultAsBytes || resultAsBytes.length === 0) {
          throw new Error(`${resultKey} does not exist`);
      }
      console.log(resultAsBytes.toString());
      return resultAsBytes.toString();
  }

  async queryAllMunicipalityResultsForVoting(ctx, votingId) {
      const startKey = votingId+":"+'Municipality';
      const endKey = votingId+":"+'Municipality3';

      const iterator = await ctx.stub.getStateByRange(startKey, endKey);

      const allResults = [];
      while (true) {
          const res = await iterator.next();

          if (res.value && res.value.value.toString()) {
              console.log(res.value.value.toString('utf8'));

              const Key = res.value.key;
              let Record;
              try {
                  Record = JSON.parse(res.value.value.toString('utf8'));
              } catch (err) {
                  console.log(err);
                  Record = res.value.value.toString('utf8');
              }
              allResults.push({ Key, Record });
          }
          if (res.done) {
              console.log('end of data');
              await iterator.close();
              console.info(allResults);
              return JSON.stringify(allResults);
          }
      }
  }

  async publishCantonVotingResult(ctx,reportingCanton, votingId, yesCount, noCount) {

    const cid = new ClientIdentity(ctx.stub); // "stub" is the ChaincodeStub object passed to Init() and Invoke() methods
    const invokingMSP = cid.getMSPID();
    //only cantons are allowed to publish with this and generate an according event
    if(invokingMSP=='CantonMSP' || invokingMSP=='Canton2MSP'){

      const resultToPublish = new ResultVoting(reportingCanton, votingId, yesCount, noCount);
      const resultKey = votingId+":"+reportingCanton;
      await ctx.stub.putState(resultKey,Buffer.from(JSON.stringify(resultToPublish)));


      // define and set publisheventEvent
      const eventKey = reportingCanton+":"+'PublishMunicipalityEvent';
      const votingResultEvent = {
          type: eventKey,
          votingId: votingId,
          yes: yesCount,
          no: noCount,
      };
      ctx.stub.setEvent(eventKey, Buffer.from(JSON.stringify(votingResultEvent)));
      return {resultKey, resultToPublish, votingResultEvent, invokingMSP};

    } else {
      throw new Error("Only Cantons are allowed to publish results through this function call");
    }

  }

  async publishConfederationVotingResult(ctx, votingId, yesCount, noCount) {

    const cid = new ClientIdentity(ctx.stub); // "stub" is the ChaincodeStub object passed to Init() and Invoke() methods
    const invokingMSP = cid.getMSPID();
    //only the confederation is allowed to publish with this and generate an according event
    if(invokingMSP=='ConfederationMSP'){
      const reportingAgency = "Confederation";

      const resultToPublish = new ResultVoting(reportingAgency, votingId, yesCount, noCount);
      const resultKey = reportingAgency+votingId;
      await ctx.stub.putState(resultKey,Buffer.from(JSON.stringify(resultToPublish)));

      // define and set publisheventEvent
      const eventKey = reportingAgency+":"+'PublishMunicipalityEvent';
      const votingResultEvent = {
          type: eventKey,
          votingId: votingId,
          yes: yesCount,
          no: noCount,
      };
      await ctx.stub.setEvent(eventKey, Buffer.from(JSON.stringify(votingResultEvent)));
      return {resultKey, resultToPublish, votingResultEvent, invokingMSP};

    } else {
      throw new Error("Only Cantons are allowed to publish results through this function call");
    }
  }
}

console.log("hello");

module.exports=PublishingContract;
