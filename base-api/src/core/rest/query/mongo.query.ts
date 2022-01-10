import * as lodash from 'lodash';
import { QueryParams } from './query.params';
import { BaseQuery } from './base.query';
import { Model, Query } from 'mongoose';

export class MongoQuery extends BaseQuery {

  offset: number = 0;
  limit: number = 25;
  query: Object = {};
  sort: Object = {};
  fields: Object = {};

  constructor(params : QueryParams) {
    super(params);
    this.limit = this.parseNumberParam(params, 'limit') || this.limit;
    this.offset = this.parseNumberParam(params, 'offset') || this.offset;
    this.sort = this.parseJsonObjectParam(params, 'sort') || this.sort;
    this.query = this.parseJsonObjectParam(params, 'query') || this.query;
    this.fields = this.parseJsonObjectParam(params, 'fields') || this.fields;
  }

  mergeQuery(query: Object): void {
    this.query = lodash.merge({}, this.query, query);
  }

  surroundQuery(query: Object): void {
    this.query = {
      $and: [
        this.query,
        query
      ]
    };
  }

  buildQuery<Entity>(model: Model<Entity>): Query<any, any, any, any> {
    return model
      .find(this.query as any)
      .select(this.fields)
      .limit(this.limit)
      .skip(this.offset)
      .sort(this.sort);
  }
}
