import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-organizer-settings',
  templateUrl: './organizer-settings.component.html',
  styleUrls: ['./organizer-settings.component.css']
})
export class OrganizerSettingsComponent implements OnInit {
  currentOrg: any = null;
  orgName: string = '';
  name = '';
  message = '';
  constructor(private organizerService: OrganizationService,
              private route: ActivatedRoute,
              private Router: Router) { }

  ngOnInit(): void {
    this.getOrg(this.route.snapshot.paramMap.get('name'));
  }

  getOrg(name: any): void {
    this.organizerService.loginVal(name)
      .subscribe(
        response => {
          this.currentOrg = response[0];
          this.orgName = name;
          console.log(this.orgName);
          console.log(response);
        },
        error => {
          console.log(error)
        });
  }

  changeCat() {
    this.currentOrg.changeCat = true;
    this.organizerService.update(this.currentOrg.id, this.currentOrg)
      .subscribe(
        response => {
          console.log(response);
          this.message = "Category change request was sent.";
        },
        error => {
          console.log(error);
          this.message = error;
        });
  }

}
