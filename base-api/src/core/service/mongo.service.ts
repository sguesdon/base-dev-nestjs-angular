import { Model, Document } from 'mongoose';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoQuery, ElasticQuery, QueryParams, QueryResult, emptyResult } from '../rest/query';

export abstract class MongoService<Entity, CreateDto, UpdateDto = void, PatchDto = void> {

  protected abstract model: Model<Entity & Document>;

  async create(createMemberDto: CreateDto): Promise<Entity> {
    const createdMember = new this.model(createMemberDto);
    return createdMember.save();
  }

  async findAll(): Promise<Entity[]> {
    return this.model.find().exec();
  }

  async findById(id: string) : Promise<Entity> {
    return await this.model.findById(id);
  }

  async update(id: string, data: (CreateDto | UpdateDto)): Promise<Entity> {
    const record = await this.model.findById(id);
    record.overwrite(data as any);
    return await record.save();
  }

  async patch(id: string, data: (CreateDto | UpdateDto | PatchDto)): Promise<Entity> {
    const record = await this.model.findById(id);
    record.set(data);
    return await record.save();
  }

  async estimatedDocumentCount(query: MongoQuery): Promise<number> {
    return await this.model.estimatedDocumentCount(<any> query.query).exec();
  }

  async find(query: MongoQuery, lean: boolean = true): Promise<Entity[]> {
    return query
      .buildQuery(this.model)
      .setOptions({lean})
      .exec();
  }

  async findAndCount(query: MongoQuery, lean: boolean = true) : Promise<QueryResult<Entity>> {
    const [data, total] = await Promise.all([
      this.find(query, lean),
      this.estimatedDocumentCount(query)
    ]);
    return <QueryResult<Entity>> {data, total};
  }

  async delete(id: string): Promise<void> {
    const record: any = await this.model.findById(id);
    await record.remove();
  }

  async search(query: ElasticQuery, raw: boolean = false) : Promise<QueryResult<Entity>> {

    const model: any = this.model;
    let typeError: any, rawResult: any;

    if(typeof model.esSearch === 'undefined') {
      throw `search option not active for this data model`;
    }

    try {
      rawResult = await query.buildQuery(model);
    } catch(queryError) {
      const errorType: string = queryError.meta.body.error.type;
      if(errorType === "index_not_found_exception") {
        await model.esCreateMapping({});
        return emptyResult;
      }

      throw queryError;
    }

    return <QueryResult<Entity>> {
      total: rawResult.body.hits.total.value,
      data: rawResult.body.hits.hits.map((r) => ({ _id: r._id, ...r._source }))
    };
  }
}
