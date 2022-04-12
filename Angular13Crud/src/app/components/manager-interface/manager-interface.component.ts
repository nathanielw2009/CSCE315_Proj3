import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-manager-interface',
  templateUrl: './manager-interface.component.html',
  styleUrls: ['./manager-interface.component.css']
})
export class ManagerInterfaceComponent implements OnInit {
  events: any;
  orgs: any;
  currentEvent: any = null;
  currentOrg: any = null;
  currentIndex = -1;
  currentOrgIndex = -1;
  message = '';
  catMessage = '';

  constructor(private eventService: EventService,
              private organizationService: OrganizationService,
              private route: ActivatedRoute,
              private Router: Router) { }

  ngOnInit(): void {
    this.getEvents();
    this.getOrgs();
  }

  getEvents() {
    this.eventService.findAllPending()
      .subscribe(
        response => {
          this.events = response;
          console.log(response);
        },
        error => {
          console.log(error)
        });
  }

  getOrgs() {
    this.organizationService.findAllCatChange()
      .subscribe(
        response => {
          this.orgs = response;
          console.log(response);
        },
        error => {
          console.log(error);
        }
      )
  }

  refreshEvents(): void {
    this.getEvents();
    this.currentEvent = null;
    this.currentIndex = -1;
    this.getOrgs();
    this.currentOrg = null;
    this.currentOrgIndex = -1;
  }

  setActiveEvent(event: { name: string; description: string; date: string; time: string; location: string }, index: number): void {
    this.currentEvent = event;
    this.currentIndex = index;
  }

  setActiveOrg(org: {name: string; category: string; reqCategory: string; changeCat: boolean }, index: number): void {
    this.currentOrg = org;
    this.currentOrgIndex = index;
  }

  acceptEvent() {
    this.currentEvent.status = 'APPROVED';
    this.currentEvent.show = true;
    this.eventService.update(this.currentEvent.id, this.currentEvent)
      .subscribe(
        response => {
          console.log(response);
          this.message = "Accepted Event successfully";
        },
        error => {
          console.log(error);
          this.message = error;
        });
  }

  acceptOrg() {
    this.currentOrg.category = this.currentOrg.reqCategory;
    this.currentOrg.changeCat = false;
    this.organizationService.update(this.currentOrg.id, this.currentOrg)
      .subscribe(
        response => {
          console.log(response);
          this.catMessage = "Accepted category change successfully";
        },
        error => {
          console.log(error);
          this.message = error;
        });
  }

  rejectEvent() {
    this.currentEvent.status = 'REJECTED';
    this.currentEvent.show = true;
    this.eventService.update(this.currentEvent.id, this.currentEvent)
      .subscribe(
        response => {
          console.log(response);
          this.message = "Accepted Rejected successfully";
        },
        error => {
          console.log(error);
          this.message = error;
        });
  }

  rejectOrg() {
    this.currentOrg.changeCat = false;
    this.organizationService.update(this.currentOrg.id, this.currentOrg)
      .subscribe(
        response => {
          console.log(response);
          this.catMessage = "Rejected category change successfully";
        },
        error => {
          console.log(error);
          this.catMessage = error;
        });
  }

}
