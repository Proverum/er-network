import { Injectable } from '@angular/core';
import { Citizen } from './citizen';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {

  constructor(private http: HttpClient) { }

  getAllCitizens(port: number, nodeName: string, api: string): Promise<Citizen[]> {
    let url = "http://localhost:"+port+"/api/"+nodeName+"/"+api;
    console.log("getting all citizens at: ", url);
    return this.http.get(url)
      .toPromise()
      .then(
        // res => console.log(res.response),
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
}
