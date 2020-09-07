import { Injectable } from '@angular/core';
import { Client } from './client';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndpoint: string = 'http://localhost:8080/api/clients';
  private httpHeaders = new HttpHeaders({'content-type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getClients(): Observable <Client[]> {
    return this.http.get<Client[]>(this.urlEndpoint);
  }

  getClient(id): Observable<Client>{
    return this.http.get<Client>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clients']);
        swal('Error while getting client', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  create(client: Client) : Observable<any> {
    return this.http.post<any>(this.urlEndpoint, client, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }

        swal('Error while saving this client', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  update(client: Client) : Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${client.id}`, client, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }

        swal('Error while updating this client', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number) : Observable<Client> {
    return this.http.delete<Client>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        swal('Error while erasing this client', e.error.message, 'error');
        return throwError(e);
      })
    );
  }
}
