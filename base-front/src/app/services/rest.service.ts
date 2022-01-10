import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Response } from '../interface/response.interface';

export abstract class RestService<T> {

  protected abstract endpoint: string;
  protected abstract http: HttpClient;

  constructor() {}

  async get() : Promise<T[]> {
    const response : Response<T[]> = (await this.http.get(`${environment.apiBaseUrl}/${this.endpoint}`).toPromise()) as Response<T[]>;
    return response.data;
  }

  async getById(id: string) : Promise<T> {
    const response : Response<T> = (await this.http.get(`${environment.apiBaseUrl}/${this.endpoint}/${id}`).toPromise()) as Response<T>;
    return response.data;
  }

  async getRaw() : Promise<Response<T[]>> {
    return await this.http.get(`${environment.apiBaseUrl}/${this.endpoint}`).toPromise() as Response<T[]>;
  }
}
