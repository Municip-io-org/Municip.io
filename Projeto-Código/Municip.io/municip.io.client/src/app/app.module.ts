import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './landingpage/banner/banner.component';
import { AboutusComponent } from './aboutus/aboutus/aboutus.component';
import { CardComponent } from './landingpage/card/card.component';
import { LandingComponent } from './landingpage/landing/landing.component';
import { BtnMunicipBlueComponent } from './utils/buttons/btn-municip-blue/btn-municip-blue.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CardTeamComponent } from './aboutus/card-team/card-team.component';
import { LoginComponent } from './login/login.component';
import { ShowHidePasswordComponent } from './utils/show-hide-password/show-hide-password.component';
import { TermsconditionsComponent } from './termsconditions/termsconditions.component';
import { SelectAccountTypeComponent } from './signUp/select-account-type/select-account-type.component';
import { SignUpCitizenAccountComponent } from './signUp/sign-up-citizen-account/sign-up-citizen-account.component';
import { InputTitleComponent } from './utils/input/input-title/input-title.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpMunicipalAdministratorAccountComponent } from './signUp/sign-up-municipal-administrator-account/sign-up-municipal-administrator-account.component';
import { SignUpMunicipalityComponent } from './signUp/sign-up-municipality/sign-up-municipality.component';
import { UserpageComponent } from './userpage/userpage.component';
import { TooltipComponent } from './utils/tooltip/tooltip.component';
import { SignUpSuccessComponent } from './signUp/sign-up-success/sign-up-success.component';
import { SpinnerComponent } from './utils/spinner/spinner.component';
import { LoadingInterceptor } from './utils/loading.interceptor';
import { MunicipalityGuard } from './utils/guard/municipality.guard';
import { AuthGuardService } from './utils/guard/auth.guard';
import { AdmindashboardComponent } from './administrator/admindashboard/admindashboard.component';
import { TransportsMainComponent } from './transports/transports-main/transports-main.component';
import { VerticalCardComponent } from './utils/vertical-card/vertical-card.component';
import { BigBannerComponent } from './utils/big-banner/big-banner.component';
import { SmallerBannerComponent } from './utils/smaller-banner/smaller-banner.component';
import { SchedulesComponent } from './transports/schedules/schedules.component';
import { MunAdmindashboardComponent } from './munadministrator/mun-admindashboard/mun-admindashboard.component';
import { MunicipalitymapComponent } from './maps/municipalitymap/municipalitymap.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { UserinfodialogComponent } from './utils/userinfodialog/userinfodialog.component';
import { StopsMapComponent } from './transports/stops-map/stops-map.component';
import { StopsPageComponent } from './transports/stops-page/stops-page.component';



@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    AboutusComponent,
    CardComponent,
    LandingComponent,
    BtnMunicipBlueComponent,
    HeaderComponent,
    FooterComponent,
    CardTeamComponent,
    LoginComponent,
    SelectAccountTypeComponent,
    ShowHidePasswordComponent,
    TermsconditionsComponent,
    SelectAccountTypeComponent,
    SignUpCitizenAccountComponent,
    InputTitleComponent,
    SignUpMunicipalAdministratorAccountComponent,
    SignUpMunicipalityComponent,
    UserpageComponent,
    TooltipComponent,
    SignUpSuccessComponent,
    SpinnerComponent,
    AdmindashboardComponent,
    TransportsMainComponent,
    VerticalCardComponent,
    BigBannerComponent,
    SmallerBannerComponent,
    SchedulesComponent,
    MunAdmindashboardComponent,
    MunicipalitymapComponent,
    UserinfodialogComponent,
    StopsMapComponent,
    StopsPageComponent
    
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule, GoogleMapsModule
  ],
  providers: [
    MunicipalityGuard,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
      
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
