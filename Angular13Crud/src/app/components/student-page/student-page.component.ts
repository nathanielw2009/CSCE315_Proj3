import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { EventSelect } from 'src/app/models/event-select.model';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {
  events: EventSelect[] = [];

  filter = {
    startDate: '',
    useStartDate: false,
    endDate: '',
    useEndDate: false,
    eventName: '',
    useEventName: false,
    organizations: []
  };

  constructor(private route: ActivatedRoute,
  private router: Router,
  private eventservice: EventService) { }

  ngOnInit(): void {
     this.getEvents();
  }

  inputStartDate(): void {
    this.filter.useStartDate = !this.filter.useStartDate;
    console.log(this.filter.startDate);
  }

  inputEndDate(): void {
    this.filter.useEndDate = !this.filter.useEndDate;
    console.log(this.filter.useEndDate);
  }

  inputEventName(): void {
     this.filter.useEventName = !this.filter.useEventName;
     console.log(this.filter.useEventName);
  }

  submit(): void {
    console.log("submit to backend for events");
  }
  // TODO. Need backend support to query with filters (where condition in sql)
  getEvents(): void {
     this.eventservice.getEvents().subscribe(events => {
        this.events = [];
        for (let entry of events) {
            const temp = new EventSelect();
            temp.event = entry;
            temp.selected = false;
            this.events.push(temp);
        }
     });
  }
}
