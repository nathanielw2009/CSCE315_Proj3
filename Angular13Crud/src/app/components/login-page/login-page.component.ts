import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  organization = {
    name: '',
    password: '',
    category: ''
  };
  message = '';
  constructor(private organizationService: OrganizationService,
              private route: ActivatedRoute,
              private Router: Router) { }

  ngOnInit(): void {
    this.message = '';
  }

  tryCreatingAccount(): void {
    this.organizationService.loginVal(this.organization.name)
      .subscribe(
        response => {
          if (response.length != 0) {
            this.message = 'Organization already exists';
          } else {
            this.createAccount();
            this.message = 'Organization created successfully.';
          }
        },
        error => {
          console.log(error);
        });
  }

  createAccount(): void {
    const data = {
      name: this.organization.name,
      password: this.organization.password,
      category: this.organization.category
    };

    this.organizationService.create(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

}
