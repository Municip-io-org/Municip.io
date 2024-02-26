import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landingpage/landing/landing.component';
import { AboutusComponent } from './aboutus/aboutus/aboutus.component';
import { LoginComponent } from './login/login.component';
import { TermsconditionsComponent } from './termsconditions/termsconditions.component';
import { SelectAccountTypeComponent } from './signUp/select-account-type/select-account-type.component';
import { SignUpCitizenAccountComponent } from './signUp/sign-up-citizen-account/sign-up-citizen-account.component';
import { SignUpMunicipalAdministratorAccountComponent } from './signUp/sign-up-municipal-administrator-account/sign-up-municipal-administrator-account.component';
import { SignUpMunicipalityComponent } from './signUp/sign-up-municipality/sign-up-municipality.component';
import { UserpageComponent } from './userpage/userpage.component';
import { SignUpSuccessComponent } from './signUp/sign-up-success/sign-up-success.component';
import { MunicipalityGuard } from './utils/guard/municipality.guard';
import { AuthGuardService } from './utils/guard/auth.guard';
import { AdmindashboardComponent } from './administrator/admindashboard/admindashboard.component';
import { TransportsMainComponent } from './transports/transports-main/transports-main.component';
import { SchedulesComponent } from './transports/schedules/schedules.component';
import { MunAdmindashboardComponent } from './munadministrator/mun-admindashboard/mun-admindashboard.component';
import { MunicipalitymapComponent } from './maps/municipalitymap/municipalitymap.component';
import { StopsMapComponent } from './transports/stops-map/stops-map.component';
import { StopsPageComponent } from './transports/stops-page/stops-page.component';
import { CitizenHomePageComponent } from './citizen/citizen-home-page/citizen-home-page.component';
import { CitizenGuard } from './utils/guard/citizen.guard';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { MunAdminHomePageComponent } from './munadministrator/mun-admin-home-page/mun-admin-home-page.component';
import { MunicipalAdminGuard } from './utils/guard/municipal-admin.guard';
import { MunicipalProfileComponent } from './munadministrator/municipal-profile/municipal-profile.component';
import { CitizenOrMunicipalAdminGuard } from './utils/guard/citizen-or-municipal-admin.guard';
import { MunicipalEditComponent } from './munadministrator/municipal-edit/municipal-edit.component';
import { MunicipalEventsComponent } from './events/municipal-events/municipal-events.component';
import { CalendarPageComponent } from './events/my-events/calendar-page/calendar-page.component';
import { CreateEventComponent } from './events/municip-actions/create-event/create-event.component';
import { EventPageComponent } from './events/event-page/event-page.component';
import { EditEventComponent } from './events/municip-actions/edit-event/edit-event.component';


const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full', data: { animation: 'Home' } },
  {
    path: 'login', component:
      LoginComponent, data: { animation: 'Login' }
  },
  { path: 'signUp-SelectAccountType', component: SelectAccountTypeComponent, data: {} },
  { path: 'userpage', component: UserpageComponent, data: {}, canActivate: [AuthGuardService] },
  { path: 'signUp-Citizen', component: SignUpCitizenAccountComponent, data: {} },
  { path: 'signUp-MunicipalAdministrator', component: SignUpMunicipalAdministratorAccountComponent, data: {} },
  { path: 'signUp-Municipality/:municipalName', component: SignUpMunicipalityComponent, data: {}, canActivate: [MunicipalityGuard] },
  { path: 'signUp-Success', component: SignUpSuccessComponent, data: {} },
  { path: 'aboutus', component: AboutusComponent, data: {} },
  { path: 'admindashboard', component: AdmindashboardComponent, data: {} },
  { path: 'termsconditions', component: TermsconditionsComponent, data: {} },
  { path: 'transports', component: TransportsMainComponent, data: {} },
  { path: 'transports/schedules', component: SchedulesComponent, data: {} },
  { path: 'munadmin-dashboard/:municipalName', component: MunAdmindashboardComponent, data: {} },
  { path: 'municipalitymap', component: MunicipalitymapComponent, data: {} },
  { path: 'transports/stops', component: StopsPageComponent, data: {} },
  { path: 'transports/stops/:selectedStop', component: StopsPageComponent, data: {} },
  { path: 'municipal/homePage', component: MunAdminHomePageComponent, data: {}, canActivate: [MunicipalAdminGuard] },
  { path: 'municipal/profile', component: MunicipalProfileComponent, data: {}, canActivate: [CitizenOrMunicipalAdminGuard] },
  { path: 'municipal/edit', component: MunicipalEditComponent, data: {}, canActivate: [MunicipalAdminGuard] },
  { path: 'citizen/homePage', component: CitizenHomePageComponent, data: {}, canActivate: [CitizenGuard] },
  { path: 'events/create', component: CreateEventComponent, data: {} },
  { path: 'events/edit/:eventId', component: EditEventComponent, data: {} },
  { path: 'events', component: MunicipalEventsComponent, data: {}, canActivate: [CitizenOrMunicipalAdminGuard] },
  { path: 'events/:selectedEvent', component: EventPageComponent, data: {}, canActivate: [CitizenOrMunicipalAdminGuard] },
  { path: 'accessDenied', component: AccessDeniedComponent, data: {} },
  { path: 'events/calendar', component: CalendarPageComponent, data: {}, canActivate: [CitizenGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
