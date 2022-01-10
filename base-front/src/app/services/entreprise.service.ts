import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from './rest.service';
import { Entreprise } from '../interface/entreprise.interface';

@Injectable()
export class EntrepriseService extends RestService<Entreprise> {
  protected endpoint : string = 'entreprises';
  constructor(protected http: HttpClient) {
    super();
  }
}
