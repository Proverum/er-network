import { Injectable } from '@angular/core';
import { Citizen } from './citizen';
import { Voter } from './voter';
import { VoterList } from './voterList';
import { Hash } from './hash';
import { TransitQueryRequest } from './transitQueryRequest';
import { Tx } from './tx';
import { NewCitizenRequest } from './newCitizenRequest';
import { DeleteCitizenRequest } from './deleteCitizenRequest';
import { VerifyVoterRequest } from './verifyVoterRequest';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8'
    })
  }

  addCitizen(port: number, nodeName: string, citizen: NewCitizenRequest): Promise<string> {
    let url = "http://localhost:"+port+"/api/"+nodeName+"/addcitizen";
    console.log("adding citizen at url: ", url);
    console.log(JSON.stringify(citizen));
    return this.http.post(url, JSON.stringify(citizen), this.httpOptions)
      .toPromise()
      .then(
        res => new Tx().deserialize(res).txResponse);
  }

  deleteCitizen(port: number, nodeName: string, citizenToDelete: DeleteCitizenRequest): Promise<string> {
    let url = "http://localhost:"+port+"/api/"+nodeName+"/deletecitizen/"+citizenToDelete.citizenKey;
    console.log("deleting citizen at url ", url);
    return this.http.delete(url, this.httpOptions)
      .toPromise()
      .then(
        res => new Tx().deserialize(res).txResponse);
  }

  getAllCitizens(port: number, nodeName: string): Promise<Citizen[]> {
    let url = "http://localhost:"+port+"/api/"+nodeName+"/queryallcitizens";
    console.log("getting all citizens at: ", url);
    return this.http.get(url)
      .toPromise()
      .then(
        //d res => console.log(res.response),
        res => this.createCitizensArray(res) as Citizen[],
      );
  }

  queryTransit(port: number, nodeName: string, transitStore: string): Promise<Citizen[]> {
    let url = "http://localhost:"+port+"/api/"+nodeName+"/querytransit/"+transitStore;
    console.log("getting all citizens at: ", url);
    return this.http.get(url)
      .toPromise()
      .then(
        //d res => console.log(res.response),
        res => this.createCitizensArray(res) as Citizen[],
      );
  }

  createCitizensArray(input: any): Citizen[] {
    let citizens = new Array<Citizen>();
    console.log("input in create Citizens arrey ", input);
    input.response.forEach((element: string[]) => {
      console.log(element);
      let receivedCitizen = new Citizen().deserialize(element);
      console.log("desreialized citizen ", receivedCitizen);
      citizens.push(receivedCitizen);
    });
    console.log(citizens);
    return citizens;
  }

  getAllVoters(port: number, nodeName: string): Promise< [Voter[], VoterList]> {
    let url = "http://localhost:"+port+"/api/"+nodeName+"/queryallvoters";
    console.log("getting all voters at: ", url);
    return this.http.get(url)
      .toPromise()
      .then(
        //d res => console.log(res.response),
        res => this.createVotersArray(res) as [Voter[], VoterList],
      );
  }

  createVotersArray(input: any): [Voter[], VoterList] {
    let voters = new Array<Voter>();
    let voterList: VoterList;
    console.log("input in create Voters arrey ", input);
    input.response.forEach((element: any) => {
      console.log(element);
      if (element.Record.class == "voting-citizen") {
        let receivedVoter = new Voter().deserialize(element);
        console.log("deserialized voter ", receivedVoter);
        voters.push(receivedVoter);
      } else if (element.Record.class == "voterlist") {
        let receivedVoterList = new VoterList().deserialize(element);
        console.log("deserialized voterList ", receivedVoterList);
        voterList = receivedVoterList;
        console.log(voterList);
      } else {
        console.log("received neither a voter nor a voterlist object");
      }
    });
    let result: [Voter[], VoterList] = [voters, voterList];
    console.log("returning the following from the api service: ", result);
    return result;
  }

  // getVoterList(port: number, nodeName: string): Promise<VoterList[]> {
  //   let url = "http://localhost:"+port+"/api/"+nodeName+"/queryallcitizens";
  //   console.log("getting all citizens at: ", url);
  //   return this.http.get(url)
  //     .toPromise()
  //     .then(
  //       //d res => console.log(res.response),
  //       res => this.createCitizensArray(res) as Citizen[],
  //     );
  // }

  getWorldState(port: number, nodeName: string, channelName): Promise<Hash[]> {
    let url = "http://localhost:"+port+"/api/"+nodeName+"/worldstate/"+channelName;
    console.log("getting worldstate at: ", url);
    return this.http.get(url)
      .toPromise()
      .then(
        //d res => console.log(res.response),
        res => this.createHashesArray(res) as Hash[],
      );
  }

  createHashesArray(input: any): Hash[] {
    let hashes = new Array<Hash>();
    console.log("input in create hashes array ", input);
    input.response.forEach((element: string[]) => {
      console.log(element);
      let receivedHash = new Hash().deserialize(element);
      console.log("deserialized hash ", receivedHash);
      hashes.push(receivedHash);
    });
    console.log(hashes);
    return hashes;
  }

  createER(port: number, nodeName: string): Promise<string> {
    let url = `http://localhost:${port}/api/${nodeName}/generateER`;
    console.log("generate ER at url ", url);
    return this.http.post(url,  this.httpOptions)
      .toPromise()
      .then(
        res => new Tx().deserialize(res).txResponse);
  }

  verifyER(port: number, nodeName: string): Promise<string> {
    let getVotersUrl = `http://localhost:${port}/api/${nodeName}/verifyER`;
    console.log("verify ER at url ", getVotersUrl);
    return this.http.get(getVotersUrl)
      .toPromise()
      .then(
        res => new Tx().deserialize(res).txResponse);
  }

  getVoterHash(port: number, nodeName: string, voterToVerify: VerifyVoterRequest): Promise<Hash> {
    let getVoterHashUrl = `http://localhost:${port}/api/${nodeName}/queryvoterhash/${voterToVerify.hashKey}`;
    console.log("verify voterhash at url ", getVoterHashUrl);
    return this.http.get(getVoterHashUrl)
      .toPromise()
      .then(
        res => new Hash().deserialize(res));
  }

  // moveCitizen(port: number, nodeName: string, moveRequest: MoveCitizenRequest): Promise<string> {
  //   let url = `http://localhost:${port}/api/${nodeName}/movecitizen`;
  //   console.log("move citizen at url ", url);
  //   return this.http.post(url, JSON.stringify(moveRequest), this.httpOptions)
  //     .toPromise()
  //     .then(
  //       res => new Tx().deserialize(res).txResponse);
  // }


}
