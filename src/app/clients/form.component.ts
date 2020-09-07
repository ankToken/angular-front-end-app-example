import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public client: Client = new Client();
  public title: string = "Create new Client";
  public errors: string[];

  constructor(private clientService: ClientService, private router: Router,
  private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient(): void {
    this.activatedroute.params.subscribe(params => {
      let id = params['id']
      if (id){
        this.clientService.getClient(id).subscribe((client)=> this.client = client)
      }
    });
  }


  public create(): void{
    this.clientService.create(this.client)
    .subscribe(json => {
      this.router.navigate(['/clients'])
      swal('New client', `Client ${json.client.name} successfully created`, 'success')
    },
    err => {
      this.errors = err.error.errors as string[];
    }
    );
  }

  public update(): void{
    this.clientService.update(this.client)
    .subscribe(json => {
      this.router.navigate(['/clients'])
      swal('Client updated', `Client ${json.client.name} successfully updated`, 'success')
    },
    err => {
      this.errors = err.error.errors as string[];
    }
  );
  }
}
