import { Injectable } from '@angular/core';
import { Citizen } from './citizen';
import { Tx } from './tx';
import { NewCitizenRequest } from './newCitizenRequest';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

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
    return this.http
      .post(url, JSON.stringify(citizen), this.httpOptions)
      .toPromise()
      .then(
        res => new Tx().deserialize(res).txResponse);
  }

  private deleteCitizen(port: number, nodeName: string, citizenKeyToDeletea: string): Observable<{}> {
    let url = `http://localhost:${port}/api/${nodeName}/deletecitizen/${citizenKeyToDeletea}`;
    console.log("deleting citizen at url ", url);
    return this.http
      .delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError('deleteHero'))
      );
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

  private createCitizensArray(input: any): Citizen[] {
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

  private createER(port: number, nodeName: string): Observable<Citizen> {
    let url = `http://localhost:${port}/api/${nodeName}/generateER`;
    console.log("generate ER at url ", url);
    return this.http.post<Citizen>(url,  this.httpOptions)
      .pipe(
        catchError(this.handleError('addHero', hero))
      );
  }

}
