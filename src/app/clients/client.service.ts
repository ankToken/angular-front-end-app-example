import { Injectable } from '@angular/core';
import { Client } from './client';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndpoint: string = 'http://localhost:8080/api/clients';
  constructor(private http: HttpClient) { }

  getClients(): Observable <Client[]> {
    return this.http.get<Client[]>(this.urlEndpoint);
  }
}
