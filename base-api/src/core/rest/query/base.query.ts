import { QueryParams } from './query.params';

export class BaseQuery {

  constructor(params: QueryParams) {

  }

  throwInvalidParam(name: string) {
    throw new Error(`invalid ${name} param`);
  }

  protected parseJsonObjectParam(params: QueryParams, name: string) : Object {

    if(typeof params[name] === 'undefined' || params[name] === null) {
      return null;
    }

    try {
        const parsed = JSON.parse(params[name]);
        if(typeof parsed !== 'object' || Array.isArray(parsed)) {
          this.throwInvalidParam(name);
        }
        return parsed;
    } catch(err) {
        this.throwInvalidParam(name);
    }
  }

  protected parseJsonArrayParam(params: QueryParams, name: string) : Array<any> {

    if(typeof params[name] === 'undefined' || params[name] === null) {
      return null;
    }

    try {
      const parsed = JSON.parse(params[name]);
      if(typeof parsed !== 'object' || !Array.isArray(parsed)) {
        this.throwInvalidParam(name);
      }
      return parsed;
    } catch(err) {
      this.throwInvalidParam(name);
    }
  }

  protected parseNumberParam(params: QueryParams, name: string) : number {

    if(typeof params[name] === 'undefined' || params[name] === null) {
      return null;
    }

    try {
      const parsed = parseInt(params[name]);
      if(isNaN(parsed) || parsed < 0) {
        this.throwInvalidParam(name);
      }
      return parsed;
    } catch(err) {
      this.throwInvalidParam(name);
    }
  }
}
