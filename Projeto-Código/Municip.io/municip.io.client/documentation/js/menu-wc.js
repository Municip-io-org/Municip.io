'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">municip.io.client documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-0e1e2e6c80425c7210c200274a18f5a269b5acbcd22840389100f94e733cdb81be9267a72c21de1fcd6ae986ef872e5ec0e6a1d546d995573b100c422a148746"' : 'data-bs-target="#xs-components-links-module-AppModule-0e1e2e6c80425c7210c200274a18f5a269b5acbcd22840389100f94e733cdb81be9267a72c21de1fcd6ae986ef872e5ec0e6a1d546d995573b100c422a148746"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-0e1e2e6c80425c7210c200274a18f5a269b5acbcd22840389100f94e733cdb81be9267a72c21de1fcd6ae986ef872e5ec0e6a1d546d995573b100c422a148746"' :
                                            'id="xs-components-links-module-AppModule-0e1e2e6c80425c7210c200274a18f5a269b5acbcd22840389100f94e733cdb81be9267a72c21de1fcd6ae986ef872e5ec0e6a1d546d995573b100c422a148746"' }>
                                            <li class="link">
                                                <a href="components/AboutusComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutusComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AccessDeniedComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccessDeniedComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdmindashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdmindashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BannerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BannerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BigBannerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BigBannerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BlackBtnIconTextComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlackBtnIconTextComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BtnMunicipBlueComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BtnMunicipBlueComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardOutlineThemeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardOutlineThemeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardOutlineWhiteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardOutlineWhiteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardTeamComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardTeamComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CitizenHomePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CitizenHomePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateEventComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateEventComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DatePickerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatePickerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DatetimepickerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatetimepickerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogMessageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogMessageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditEventComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditEventComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventsListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventsListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventsSmallComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventsSmallComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GeneralInfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GeneralInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderLoggedinComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderLoggedinComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InputTitleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputTitleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LandingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LandingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MunAdminHomePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MunAdminHomePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MunAdmindashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MunAdmindashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MunicipalEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MunicipalEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MunicipalEventsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MunicipalEventsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MunicipalProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MunicipalProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MunicipalitymapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MunicipalitymapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MyDataCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MyDataCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MyMunicipalityCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MyMunicipalityCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewsCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewsCreateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewsEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewsListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewsPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewsSmallComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsSmallComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NextEventsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NextEventsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NextNewsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NextNewsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileBannerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileBannerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchedulesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchedulesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectAccountTypeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectAccountTypeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShowHidePasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShowHidePasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShowStopComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShowStopComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignUpCitizenAccountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignUpCitizenAccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignUpMunicipalAdministratorAccountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignUpMunicipalAdministratorAccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignUpMunicipalityComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignUpMunicipalityComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignUpSuccessComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignUpSuccessComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SmallerBannerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmallerBannerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpinnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpinnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StatisticalHomePageCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatisticalHomePageCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StopsMapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StopsMapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StopsPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StopsPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TermsconditionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TermsconditionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TooltipComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TooltipComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TransportsMainComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransportsMainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserinfodialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserinfodialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserpageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserpageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VerticalCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VerticalCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-AppModule-0e1e2e6c80425c7210c200274a18f5a269b5acbcd22840389100f94e733cdb81be9267a72c21de1fcd6ae986ef872e5ec0e6a1d546d995573b100c422a148746"' : 'data-bs-target="#xs-pipes-links-module-AppModule-0e1e2e6c80425c7210c200274a18f5a269b5acbcd22840389100f94e733cdb81be9267a72c21de1fcd6ae986ef872e5ec0e6a1d546d995573b100c422a148746"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-0e1e2e6c80425c7210c200274a18f5a269b5acbcd22840389100f94e733cdb81be9267a72c21de1fcd6ae986ef872e5ec0e6a1d546d995573b100c422a148746"' :
                                            'id="xs-pipes-links-module-AppModule-0e1e2e6c80425c7210c200274a18f5a269b5acbcd22840389100f94e733cdb81be9267a72c21de1fcd6ae986ef872e5ec0e6a1d546d995573b100c422a148746"' }>
                                            <li class="link">
                                                <a href="pipes/FirstLetterUpperCasePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FirstLetterUpperCasePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FormatNumber3By3Pipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormatNumber3By3Pipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AdmindashboardComponent-1.html" data-type="entity-link" >AdmindashboardComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BoundsService.html" data-type="entity-link" >BoundsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CitizenAuthService.html" data-type="entity-link" >CitizenAuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CitizenStatusService.html" data-type="entity-link" >CitizenStatusService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomDateFormatterService.html" data-type="entity-link" >CustomDateFormatterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomEventTitleFormatterService.html" data-type="entity-link" >CustomEventTitleFormatterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventsService.html" data-type="entity-link" >EventsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoaderService.html" data-type="entity-link" >LoaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MunicipalAdminAuthService.html" data-type="entity-link" >MunicipalAdminAuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MunicipalityStatusService.html" data-type="entity-link" >MunicipalityStatusService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NewsService.html" data-type="entity-link" >NewsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransportsService.html" data-type="entity-link" >TransportsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserAuthService.html" data-type="entity-link" >UserAuthService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/LoadingInterceptor.html" data-type="entity-link" >LoadingInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link" >AuthGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/CitizenGuard.html" data-type="entity-link" >CitizenGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/CitizenOrMunicipalAdminGuard.html" data-type="entity-link" >CitizenOrMunicipalAdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/MunicipalAdminGuard.html" data-type="entity-link" >MunicipalAdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/MunicipalityGuard.html" data-type="entity-link" >MunicipalityGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/UserSameMunicipalityGuard.html" data-type="entity-link" >UserSameMunicipalityGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Citizen.html" data-type="entity-link" >Citizen</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Event.html" data-type="entity-link" >Event</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/formSchedule.html" data-type="entity-link" >formSchedule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/line.html" data-type="entity-link" >line</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Login.html" data-type="entity-link" >Login</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MunicipalAdministrator.html" data-type="entity-link" >MunicipalAdministrator</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Municipality.html" data-type="entity-link" >Municipality</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/municipalityTransport.html" data-type="entity-link" >municipalityTransport</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/News.html" data-type="entity-link" >News</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/pattern.html" data-type="entity-link" >pattern</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/route.html" data-type="entity-link" >route</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/stop.html" data-type="entity-link" >stop</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/stopInfo.html" data-type="entity-link" >stopInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/stopTime.html" data-type="entity-link" >stopTime</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/trip.html" data-type="entity-link" >trip</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});