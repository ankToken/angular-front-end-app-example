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
    swal({
      title: 'Are you sure?',
      text: `Are you sure want to delete client ${client.name}?`,
      icon: 'warning',
      buttons: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result) {
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
    })
  }
}
