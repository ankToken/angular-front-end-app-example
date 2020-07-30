import { Injectable } from '@angular/core';
import { Client } from './client';
import { CLIENTS } from './clients.json';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  getClients(): Observable <Client[]> {
    return of(CLIENTS);
  }
}
