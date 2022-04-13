import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Event } from 'src/app/models/event.model';

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

    getEvents(): Observable<Event[]> {
      return this.http.get<Event[]>(baseUrl)
        .pipe(
          tap(_ => console.log('fetched events')),
          catchError(this.handleError<Event[]>('getEvents', []))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
