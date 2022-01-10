import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmploisComponent } from './emplois.component';
import { EditionEmploisComponent } from './edition-emplois/edition-emplois.component';
import { EditionMissionsComponent } from './edition-missions/edition-missions.component';

import { EntrepriseResolverService } from '../../resolvers/entreprise-resolver.service';

const routes : Routes = [
  {
    path: '',
    component: EmploisComponent,
    data: {title: 'Emplois'}
  },
  {
    path: 'entreprise/:entrepriseId/missions/:missionId/edit',
    component: EditionMissionsComponent,
    resolve: {
      entreprise: EntrepriseResolverService
    }
  },
  {
    path: 'entreprise/:entrepriseId/missions/add',
    component: EditionMissionsComponent
  },
  {
    path: 'entreprise/:entrepriseId/edit',
    component: EditionEmploisComponent,
    resolve: {
      entreprise: EntrepriseResolverService
    }
  },
  {
    path: 'entreprise/add',
    component: EditionEmploisComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    EntrepriseResolverService
  ]
})
export class EmploisRoutingModule {}
