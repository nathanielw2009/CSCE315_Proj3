import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css'],
})
export class StudentPageComponent implements OnInit {
  currentEvent: any;
  currentIndex: any;
  events: any;
  currentEvents: Array<any> = [];
  categories: Array<String> = [];
  locations: Array<String> = [];
  organizers: Array<String> = [];
  name: string = '';
  organizer: string = '';
  startDate: string = '';
  endDate: string = '';
  category: string = '';
  location: string = '';
  message = '';
  email: string = '';



  constructor(private route: ActivatedRoute,
  private router: Router,
  private eventService: EventService) { }

  ngOnInit(): void {
     this.getEvents();
  }

  setActiveEvent(event: { name: string; description: string; date: string; time: string; location: string }, index: number): void {
    this.currentEvent = event;
    this.currentIndex = index;
  }

  addEvent(event: { name: string; description: string; date: string; time: string; location: string }): void {
    if (!this.currentEvents.includes(event)) {
      this.currentEvents.push(event);
      console.log(this.currentEvents);
    }
  }

  addEmails(): void {
    const control = new FormControl(this.email, Validators.email);
    if (!control.errors) {
      this.message = 'You will recieve emails about these events.';
      for (var index in this.currentEvents) {
        if (!this.currentEvents[index].roster.includes(this.email)) {
          if (this.currentEvents[index].roster === null) {
            this.currentEvents[index].roster = [this.email];
          } else {
            this.currentEvents[index].roster.push(this.email);
          }
          this.eventService.update(this.currentEvents[index].id, this.currentEvents[index])
            .subscribe(
              response => {
                console.log(response);
              },
              error => {
                console.log(error);
                this.message = error;
              });
        }
      }
    } else {
      this.message = 'Enter a valid email address';
    }
  }

  // TODO. Need backend support to query with filters (where condition in sql)
  getEvents(): void {
    const name: string = this.name !== '' ? this.name : 'null';
    const organizer: string = this.organizer !== '' ? this.organizer : 'null';
    const startDate: string = this.startDate !== '' ? this.startDate : 'null';
    const endDate: string = this.endDate !== '' ? this.endDate : 'null';
    const category: string =  this.category !== '' ? this.category : 'null';
    const location: string = this.location !== '' ? this.location : 'null';
    if (startDate !== 'null' && endDate === 'null' || startDate === 'null' && endDate !== 'null') {
      this.message = 'The dates you entered are not valid. Try again.';
      return;
    }
    console.log(name);
    this.eventService.findAllApproved(name, startDate, endDate, organizer, location, category)
      .subscribe(
      response => {
        this.message = '';
        this.categories = [];
        this.locations = [];
        this.organizers = [];
        console.log(response);
        this.events = response;
        for (var index in this.events) {
          if (!this.categories.includes(this.events[index]["category"])) {
            this.categories.push(this.events[index]["category"]);
          }
          if (!this.locations.includes(this.events[index]["location"])) {
            this.locations.push(this.events[index]["location"]);
          }
          if (!this.organizers.includes(this.events[index]["organizer"])) {
            this.organizers.push(this.events[index]["organizer"]);
          }
          this.events[index]["date"] = this.events[index]["date"].substring(0,10);
        }
        console.log(this.categories);
        console.log(this.organizers);
        console.log(this.locations);
        this.currentEvent = null;
        this.currentIndex = -1;
        this.currentEvents = [];
      },
      error => {
        console.log(error);
      });
  }
}
