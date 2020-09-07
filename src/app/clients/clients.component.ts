import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {

  clients: Client[];

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      clients => this.clients = clients
    );
  }

  delete(client: Client): void {
    this.clientService.delete(client.id).subscribe(
      response => {
        this.clients = this.clients.filter(cli => cli !== client);
        swal(
          'Deleted!',
          `The client ${client.name} has been successfully deleted`,
          'success'
        )
      }
    )
  }
}
