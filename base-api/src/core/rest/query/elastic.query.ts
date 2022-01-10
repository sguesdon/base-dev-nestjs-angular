import * as lodash from 'lodash';
import { Model, Query, Document } from 'mongoose';
import { QueryParams } from './query.params';
import { BaseQuery } from './base.query';

export class ElasticQuery extends BaseQuery {

  offset: number = 0;
  limit: number = 25;
  query: Object = {match_all: {}};
  sort: Array<any> = [];
  fields: Array<any> = [];

  constructor(params : QueryParams) {
    super(params);
    this.limit = this.parseNumberParam(params, 'limit') || this.limit;
    this.offset = this.parseNumberParam(params, 'offset') || this.offset;
    this.query = this.parseJsonObjectParam(params, 'query') || this.query;
    this.sort = this.parseJsonArrayParam(params, 'sort') || this.sort;
    this.fields = this.parseJsonArrayParam(params, 'fields') || this.fields;
  }

  mergeQuery(query: Object): void {
    this.query = lodash.merge({}, this.query, query);
  }

  surroundQuery(query: Object): void {
    this.query = {
      query: {
        bool: {
          must : [
            this.query,
            query
          ]
        }
      }
    };
  }

  buildQuery<Entity>(model: any): Query<any, any, any, any> {

    const elasticQuery: any = {};

    elasticQuery.query = this.query;
    elasticQuery.from = this.offset;
    elasticQuery.size = this.limit;
    elasticQuery.sort = this.sort;

    if(this.fields && this.fields.length > 0) {
      elasticQuery.fields = this.fields;
    }

    return model.esSearch(elasticQuery);
  }
}
