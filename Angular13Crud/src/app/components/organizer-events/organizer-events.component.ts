import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-organizer-events',
  templateUrl: './organizer-events.component.html',
  styleUrls: ['./organizer-events.component.css']
})
export class OrganizerEventsComponent implements OnInit {
  currentOrg: any = null;
  orgName: any = '';
  events: any;
  shownEvents: any;
  currentEvent: any = null;
  currentIndex = -1;
  name = '';

  constructor(private eventService: EventService,
              private organizerService: OrganizationService,
              private route: ActivatedRoute,
              private Router: Router) { }

  ngOnInit(): void {
    this.orgName = this.route.snapshot.paramMap.get('name');
    this.getOrg(this.route.snapshot.paramMap.get('name'));
    this.getEvents(this.orgName);
  }

  getOrg(name: any): void {
    this.organizerService.loginVal(name)
      .subscribe(
        response => {
          this.currentOrg = response;
          this.orgName = name;
          console.log(this.orgName);
          console.log(response);
        },
        error => {
          console.log(error)
        });
  }

  getEvents(organizer: string) {
    this.eventService.findAllFromOrg(this.orgName)
      .subscribe(
        response => {
          this.events = response;

          for (var index in this.events) {
            this.events[index]["date"] = this.events[index]["date"].substring(0,10);
          }
          console.log(this.events);
        },
        error => {
          console.log(error)
        });
    this.eventService.findAllShownFromOrg(this.orgName)
      .subscribe(
        response => {
          this.shownEvents = response;
          console.log(response);
        },
        error => {
          console.log(error)
        });
  }

  refreshEvents(): void {
    this.getEvents(this.currentOrg.name);
    this.currentEvent = null;
    this.currentIndex = -1;
  }

  setActiveEvent(event: { name: string; description: string; date: string; time: string; location: string }, index: number): void {
    this.currentEvent = event;
    this.currentIndex = index;
  }

  unshow(event: { name: string; description: string; date: string; time: string; location: string }, index: number): void {
    this.currentEvent = event;
    this.currentIndex = index;
    this.currentEvent.show = false;
    this.eventService.update(this.currentEvent.id, this.currentEvent)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
    this.refreshEvents();
  }

}
