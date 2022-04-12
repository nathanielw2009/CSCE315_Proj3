import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://project3postgresql-env.eba-s8mjfkr6.us-east-1.elasticbeanstalk.com/api/events';
// services that access the backend for event queries
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
      return this.http.get(baseUrl);
    }

    get(id: number): Observable<any> {
      return this.http.get(`${baseUrl}/${id}`);
    }

    create(data: { name: string; description: string; date: string; time: string; organizer: string; location: string; show: boolean; message: string; category: string }): Observable<any> {
      return this.http.post(baseUrl, data);
    }

    update(id: number, data: { name: string; description: string; date: string; time: string; location: string }): Observable<any> {
      return this.http.put(`${baseUrl}/${id}`, data);
    }

    delete(id: number): Observable<any> {
      return this.http.delete(`${baseUrl}/${id}`);
    }

    deleteAll(): Observable<any> {
      return this.http.delete(baseUrl);
    }
    /*
    findByName(name: string): Observable<any> {
      return this.http.get(`${baseUrl}?name=${name}`);
    }
    */
    findAllFromOrg(organizer: string): Observable<any> {
      return this.http.get(`${baseUrl}/orgs/${organizer}`);
    }

    findAllShownFromOrg(organizer: string): Observable<any> {
      return this.http.get(`${baseUrl}/orgs/${organizer}/shown`);
    }

    findAllApproved(): Observable<any> {
      return this.http.get(`${baseUrl}/approved`);
    }

    findAllPending(): Observable<any> {
      return this.http.get(`${baseUrl}/pending`);
    }
}
