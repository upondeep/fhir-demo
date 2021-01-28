import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  requestTime: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);

  constructor(
    private httpClient: HttpClient
  ) { }

  getPatients() {
    return this.httpClient.get(environment.queryURI + '/Patient',
      { headers: this.getHeaders() });
  }

  getPatientsBetweenAge(lowerBound: number, upperBound: number) {
    let lbyear = new Date(), ubyear = new Date();
    lbyear.setFullYear(lbyear.getFullYear() - lowerBound);
    ubyear.setFullYear(ubyear.getFullYear() - upperBound);
    let lb = `${lbyear.toISOString().slice(0, 10)}`;
    let ub = `${ubyear.toISOString().slice(0, 10)}`;
    return this.httpClient.get(`${environment.queryURI}/Patient?birthdate=ge${ub}&birthdate=le${lb}`,
      { headers: this.getHeaders() });
  }

  // Mayer 1980-03-10
  searchPatientByNameAndBirthDate(name: string, birthDate: string) {
    return this.httpClient.get(`${environment.queryURI}/Patient?name=${name}&birthdate=${birthDate}`,
      { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/fhir+json'
    });
    return headers;
  }
}


