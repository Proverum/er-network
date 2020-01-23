const { Contract, Context } = require('fabric-contract-api');
const shim = require('fabric-shim');
const util = require('util');
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

     let resultToPublish = new ResultVoting(reportingMunicipality, votingId, yesCount, noCount);
     let resultKey = reportingMunicipality+votingId;
     let publishResponseData = await ctx.stub.putState(resultKey,Buffer.from(JSON.stringify(resultToPublish)));
     let publishResponse;
     console.log(publishResponseData);
     if (publishResponseData) {
         publishResponse = JSON.parse(publishResponseData.toString());
         console.log(result);
     } else {
         throw new Error('no publish result received');
     }

     // get result
     let resultData = await ctx.stub.getState(resultKeys);
     let result;
     console.log(resultData);
     if (resultData) {
         result = JSON.parse(resultData.toString());
         console.log(result);
     } else {
         throw new Error('result not found');
     }

     // define and set publisheventEvent
     let eventKey = reportingMunicipality+'PublishMunicipalityEvent';
     let votingResultEvent = {
         type: eventKey,
         votingId: result.votingId,
         yes: result.yesCount,
         no: result.noCounts
     };
     await ctx.stub.setEvent(eventKey, Buffer.from(JSON.stringify(votingResultEvent)));

     return result;
  }

  async publishCantonVotingResult(ctx,reportingCanton, votingId, yesCount, noCount) {

    let resultToPublish = new ResultVoting(reportingCanton, votingId, yesCount, noCount);
    let resultKey = reportingCanton+votingId;
    let publishResponseData = await ctx.stub.putState(resultKey,Buffer.from(JSON.stringify(resultToPublish)));
    let publishResponse;
    console.log(publishResponseData);
    if (publishResponseData) {
        publishResponse = JSON.parse(publishResponseData.toString());
        console.log(result);
    } else {
        throw new Error('no publish result received');
    }

    // get result
    let resultData = await ctx.stub.getState(resultKeys);
    let result;
    console.log(resultData);
    if (resultData) {
        result = JSON.parse(resultData.toString());
        console.log(result);
    } else {
        throw new Error('result not found');
    }

    // define and set publisheventEvent
    let eventKey = reportingCanton+'PublishCantonEvent';
    let votingResultEvent = {
        type: eventKey,
        votingId: result.votingId,
        yes: result.yesCount,
        no: result.noCounts
    };
    await ctx.stub.setEvent(eventKey, Buffer.from(JSON.stringify(votingResultEvent)));

    return result;
  }

  async publishConfederationVotingResult(ctx, votingId, yesCount, noCount) {

     let reportingAgency = "confederation";

     let resultToPublish = new ResultVoting(reportingAgency, votingId, yesCount, noCount);
     let resultKey = reportingAgency+votingId;
     let publishResponseData = await ctx.stub.putState(resultKey,Buffer.from(JSON.stringify(resultToPublish)));
     let publishResponse;
     console.log(publishResponseData);
     if (publishResponseData) {
         publishResponse = JSON.parse(publishResponseData.toString());
         console.log(result);
     } else {
         throw new Error('no publish result received');
     }

     // get result
     let resultData = await ctx.stub.getState(resultKeys);
     let result;
     console.log(resultData);
     if (resultData) {
         result = JSON.parse(resultData.toString());
         console.log(result);
     } else {
         throw new Error('result not found');
     }

     // define and set publisheventEvent
     let eventKey = reportingAgency+'PublishConfederationEvent';
     let votingResultEvent = {
         type: eventKey,
         votingId: result.votingId,
         yes: result.yesCount,
         no: result.noCounts
     };
     await ctx.stub.setEvent(eventKey, Buffer.from(JSON.stringify(votingResultEvent)));

     return result;
  }

}

module.exports=PublishingContract;
