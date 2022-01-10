import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';

import { EmploisComponent } from './components/emplois/emplois.component';
import { EmploisModule } from './components/emplois/emplois.module';

const routes: Routes = [
  {
      path: '',
      component: MainLayoutComponent,
      // canActivate: [AuthGuard],
      children: [
          { path: '', pathMatch: 'full', redirectTo: '/home' },
          {
              path: 'home',
              data: {title: 'Dashboard'},
              loadChildren: () => import('./components/emplois/emplois.module').then(m => m.EmploisModule)
          },
          { path: 'settings', component: SettingsComponent, data: {title: 'Settings'} },
          { path: 'profile', component: ProfileComponent, data: {title: 'Profile'} }
      ]
  },
  { path: '**', redirectTo: '/home' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
