import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landingpage/landing/landing.component';
import { AboutusComponent } from './aboutus/aboutus/aboutus.component';
import { LoginComponent } from './login/login.component';
import { TermsconditionsComponent } from './termsconditions/termsconditions.component';
import { SelectAccountTypeComponent } from './signUp/select-account-type/select-account-type.component';

const routes: Routes = [
  { path: '', component: LandingComponent, data: {} },
  { path: 'login', component: LoginComponent, data: {} },
  { path: 'signUp-SelectAccountType', component: SelectAccountTypeComponent , data: {} },
  { path: 'aboutus', component: AboutusComponent, data: {} },
  { path: 'termsconditions', component: TermsconditionsComponent, data: {} }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
