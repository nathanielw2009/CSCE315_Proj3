import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEventComponent } from './components/add-event/add-event.component';
import { OrganizerEventsComponent } from './components/organizer-events/organizer-events.component';
import { ChangingEventComponent } from './components/changing-event/changing-event.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ManagerInterfaceComponent } from './components/manager-interface/manager-interface.component';
import { OrganizerSettingsComponent } from './components/organizer-settings/organizer-settings.component';
import { StudentPageComponent } from './components/student-page/student-page.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login/:name/add', component: AddEventComponent },
  { path: 'login/:name', component: OrganizerEventsComponent },
  { path: 'login/:name/:id', component: ChangingEventComponent },
  { path: 'manager', component: ManagerInterfaceComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'login/:name/settings/changeCat', component: OrganizerSettingsComponent },
  { path: 'student', component: StudentPageComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
