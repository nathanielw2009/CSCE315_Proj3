import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AppRoutingModule } from './app-routing.module';
import { OrganizerEventsComponent } from './components/organizer-events/organizer-events.component';
import { ChangingEventComponent } from './components/changing-event/changing-event.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ManagerInterfaceComponent } from './components/manager-interface/manager-interface.component';
import { OrganizerSettingsComponent } from './components/organizer-settings/organizer-settings.component';
import { StudentPageComponent } from './components/student-page/student-page.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
//import { FormControl } from '@angular/forms';
//import { Validators } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    AddEventComponent,
    OrganizerEventsComponent,
    ChangingEventComponent,
    LoginPageComponent,
    ManagerInterfaceComponent,
    OrganizerSettingsComponent,
    StudentPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatInputModule
    //FormControl,
    //Validators
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
