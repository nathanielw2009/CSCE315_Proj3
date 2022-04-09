import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { OrganizationService } from 'src/app/services/organization.service';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  currentOrg: any = null;
  orgName: string = '';
  event = {
    name: '',
    description: '',
    date: '',
    organizer: '',
    time: '',
    location: '',
    status: 'PENDING'
  };
  submitted = false;

  constructor(private eventService: EventService,
              private organizationService: OrganizationService,
              private route: ActivatedRoute,
              private Router: Router) { }

  ngOnInit(): void {
    this.getOrg(this.route.snapshot.paramMap.get('name'));
  }

  getOrg(name: any): void {
    this.organizationService.loginVal(name)
      .subscribe(
        response => {
          this.currentOrg = response;
          this.orgName = name;
          console.log(response);
          console.log(this.orgName);
        },
        error => {
          console.log(error)
        });
  }

  saveEvent(): void {
    const data = {
      name: this.event.name,
      description: this.event.description,
      date: this.event.date,
      organizer: this.orgName,
      time: this.event.time,
      location: this.event.location,
      status: 'PENDING'
    };
    console.log(this.orgName);
    this.eventService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newEvent(): void {
    this.submitted = false;
    this.event = {
      name: '',
      description: '',
      date: '',
      organizer: this.orgName,
      time: '',
      location: '',
      status: 'PENDING'
    };
  }

}
