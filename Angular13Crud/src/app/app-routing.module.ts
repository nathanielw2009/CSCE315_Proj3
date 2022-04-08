import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEventComponent } from './components/add-event/add-event.component';
import { OrganizerEventsComponent } from './components/organizer-events/organizer-events.component';
import { ChangingEventComponent } from './components/changing-event/changing-event.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'add', component: AddEventComponent },
  { path: 'events', component: OrganizerEventsComponent },
  { path: 'events/:id', component: ChangingEventComponent },
  { path: 'login', component: LoginPageComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
