import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {GoogleMapsModule} from '@angular/google-maps';
import {MaterialModule} from '../../material.module';
import { EmploisRoutingModule } from './emplois-routing.module';

import { EmploisComponent } from './emplois.component';
import { EditionEmploisComponent } from './edition-emplois/edition-emplois.component';
import { EditionMissionsComponent } from './edition-missions/edition-missions.component';

import { EntrepriseService } from '../../services/entreprise.service';

@NgModule({
  declarations: [
      EmploisComponent,
      EditionEmploisComponent,
      EditionMissionsComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    GoogleMapsModule,
    EmploisRoutingModule
  ],
  providers: [
    EntrepriseService
  ]
})
export class EmploisModule { }
