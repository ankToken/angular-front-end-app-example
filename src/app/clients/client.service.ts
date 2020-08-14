import { Injectable } from '@angular/core';
import { Client } from './client';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndpoint: string = 'http://localhost:8080/api/clients';
  private httpHeaders = new HttpHeaders({'content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  getClients(): Observable <Client[]> {
    return this.http.get<Client[]>(this.urlEndpoint);
  }

  getClient(id): Observable<Client>{
    return this.http.get<Client>(`${this.urlEndpoint}/${id}`);
  }

  create(client: Client) : Observable<Client> {
    return this.http.post<Client>(this.urlEndpoint, client, {headers: this.httpHeaders});
  }

  update(client: Client) : Observable<Client> {
    return this.http.put<Client>(`${this.urlEndpoint}/${client.id}`, client, {headers: this.httpHeaders});
  }

  delete(id: number) : Observable<Client> {
    return this.http.delete<Client>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders});
  }
}
