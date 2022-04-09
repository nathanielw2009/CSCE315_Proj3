import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://project3postgresql-env.eba-s8mjfkr6.us-east-1.elasticbeanstalk.com/api/organizations';
// services that access the backend for organization queries
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }
    /*
    getAll(): Observable<any> {
      return this.http.get(baseUrl);
    }
    */
    get(id: number): Observable<any> {
      return this.http.get(`${baseUrl}/${id}`);
    }

    create(data: { name: string; password: string; category: string }): Observable<any> {
      return this.http.post(baseUrl, data);
    }

    update(id: number, data: { name: string; description: string; date: string }): Observable<any> {
      return this.http.put(`${baseUrl}/${id}`, data);
    }

    delete(id: number): Observable<any> {
      return this.http.delete(`${baseUrl}/${id}`);
    }

    deleteAll(): Observable<any> {
      return this.http.delete(baseUrl);
    }

    loginVal(name: string): Observable<any> {
      return this.http.get(`${baseUrl}/${name}`);
    }

    findLogIn(name: string, password: string): Observable<any> {
      return this.http.get(`${baseUrl}/orgs/${name}/${password}`);
    }

}
