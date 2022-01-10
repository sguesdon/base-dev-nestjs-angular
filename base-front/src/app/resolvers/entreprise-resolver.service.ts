import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

import { EntrepriseService } from '../services/entreprise.service';
import { Entreprise } from '../interface/entreprise.interface';

@Injectable()
export class EntrepriseResolverService implements Resolve<Entreprise> {
  constructor(private service: EntrepriseService) {}
  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getById(route.params.entrepriseId);
  }
}
