import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { ChartsModule } from 'ng2-charts';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

import { KeycloakAngularModule, KeycloakService, KeycloakOptions } from 'keycloak-angular';

import {GoogleMapService} from './services/googlemap.service';
import {GoogleMapsModule} from '@angular/google-maps';

import { environment } from '../environments/environment';

import { NgInitDirective } from './directives/ng-init.directive';

import { NavBarComponent } from './components/shared/navbar/navbar.component';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { AppComponent } from './components/app/app.component';

import { EmploisModule } from './components/emplois/emplois.module';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    NavBarComponent,
    ToolbarComponent,
    SettingsComponent,
    ProfileComponent,
    NgInitDirective,
    ConfirmDialogComponent
  ],
  imports: [
    MaterialModule,
    KeycloakAngularModule,
    GoogleMapsModule,
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgProgressModule,
    NgProgressHttpModule,
    FormsModule,
    BrowserAnimationsModule,
    ChartsModule,
    RoundProgressModule,

    AppRoutingModule,
  ],
  providers: [
    Title,
    {
      provide: APP_INITIALIZER,
      useFactory: (googleMapService: GoogleMapService) => {
        return async () => await googleMapService.init(environment.google.api);
      },
      multi: true,
      deps: [GoogleMapService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (keycloak: KeycloakService) => {
        return () => keycloak.init(<KeycloakOptions> environment.keycloak);
      },
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class AppModule { }
