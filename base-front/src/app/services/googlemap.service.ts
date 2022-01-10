import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from './rest.service';
import { Entreprise } from '../interface/entreprise.interface';
import {environment} from '../../environments/environment';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {

  constructor(private http: HttpClient) {}

  async init(url : string) {
    await this.http.jsonp(url, 'callback').toPromise();
  }
}
