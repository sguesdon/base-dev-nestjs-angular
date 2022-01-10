import { Test, TestingModule } from '@nestjs/testing';
import { MongoService } from './mongo.service';
import { Model, Document, Query } from 'mongoose';
import {jest} from '@jest/globals'

var mongoose = require('mongoose');

var memeSchema = new mongoose.Schema({
    name: { type: String }
});

const model = mongoose.model('Meme', memeSchema);

class TestMongoService extends MongoService<any, any> {
  protected model: Model<any>;
  constructor() {

    super();

    this.model = model;

    const query = new Query<any[], any>();
    jest.spyOn(query, 'exec').mockReturnValue(Promise.resolve([] as any[]));
    jest.spyOn(this.model, 'find').mockReturnValue(query);

    jest.spyOn(this.model, 'findById').mockReturnValue(Promise.resolve(null));

  }
}

describe('abstract mongo service', () => {

  let service: any;

  beforeEach(async () => {
    service = new TestMongoService();
  });

  it('findAll', async () => {
    const res = await service.findAll();
    expect(res).toMatchObject([]);
  });

  it('findById', async () => {
      const res = await service.findById("");
      expect(res).toBeNull();
  });

  it('valid offset', () => {
    console.log('roro');
  });
});
