import { Test, TestingModule } from '@nestjs/testing';
import { MongoQuery } from './mongo.query';
import { QueryParams } from './query.params';

describe('MongoQuery offset', () => {

  let params: any;

  beforeEach(async () => {
    params = {
      offset : 0,
      limit : 0,
      query : null,
      sort : null,
      fields : null
    };
  });

  it('invalid offset (string)', () => {
    expect.assertions(2);
    try {
      params.offset = 'toto';
      const query = new MongoQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid offset param');
    }
  });

  it('invalid offset (neg number)', () => {
    expect.assertions(2);
    try {
      params.offset = -10;
      const query = new MongoQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid offset param');
    }
  });

  it('valid offset', () => {
      params.offset = 5;
      const query = new MongoQuery(params);
      expect(query.offset).toBe(5);
  });
});

describe('MongoQuery limit', () => {

  let params: any;

  beforeEach(async () => {
    params = {
      offset : 0,
      limit : 0,
      query : null,
      sort : null,
      fields : null
    };
  });

  it('invalid limit (string)', () => {
    expect.assertions(2);
    try {
      params.limit = 'toto';
      const query = new MongoQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid limit param');
    }
  });

  it('invalid limit (neg number)', () => {
    expect.assertions(2);
    try {
      params.limit = -10;
      const query = new MongoQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid limit param');
    }
  });

  it('valid limit', () => {
      params.limit = 5;
      const query = new MongoQuery(params);
      expect(query.limit).toBe(5);
  });
});

describe('MongoQuery query', () => {

  let params: any;

  beforeEach(async () => {
    params = {
      offset : 0,
      limit : 0,
      query : null,
      sort : null,
      fields : null
    };
  });

  it('invalid query (invalid json)', () => {
    expect.assertions(2);
    try {
      params.query = '{{d]ddd}}';
      const query = new MongoQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid query param');
    }
  });

  it('invalid query (json array)', () => {
    expect.assertions(2);
    try {
      params.query = '["toto", "titi"]';
      const query = new MongoQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid query param');
    }
  });

  it('valid query', () => {
      params.query = '{"field":"value"}';
      const query = new MongoQuery(params);
      expect(query.query).toMatchObject({field: "value"});
  });

});

describe('MongoQuery sort', () => {

  let params: any;

  beforeEach(async () => {
    params = {
      offset : 0,
      limit : 0,
      query : null,
      sort : null,
      fields : null
    };
  });

  it('invalid sort (invalid json)', () => {
    expect.assertions(2);
    try {
      params.sort = '{{d]ddd}}';
      const query = new MongoQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid sort param');
    }
  });

  it('invalid sort (json array)', () => {
    expect.assertions(2);
    try {
      params.sort = '["toto", "titi"]';
      const query = new MongoQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid sort param');
    }
  });

  it('valid sort', () => {
      params.sort = '{"field":true}';
      const query = new MongoQuery(params);
      expect(query.sort).toMatchObject({field: true});
  });

});

describe('MongoQuery fields', () => {

  let params: any;

  beforeEach(async () => {
    params = {
      offset : 0,
      limit : 0,
      query : null,
      sort : null,
      fields : null
    };
  });

  it('invalid fields (invalid json)', () => {
    expect.assertions(2);
    try {
      params.fields = '{{d]ddd}}';
      const query = new MongoQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid fields param');
    }
  });

  it('invalid fields (json array)', () => {
    expect.assertions(2);
    try {
      params.fields = '["toto", "titi"]';
      const query = new MongoQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid fields param');
    }
  });

  it('valid sort', () => {
      params.fields = '{"field":true}';
      const query = new MongoQuery(params);
      expect(query.fields).toMatchObject({field: true});
  });

});

describe('MongoQuery operations', () => {

  let params: any;

  beforeEach(async () => {
    params = {
      offset : 0,
      limit : 0,
      query : null,
      sort : null,
      fields : null
    };
  });

  it('merge', () => {
    params.query = '{"field": "value"}';
    const query = new MongoQuery(params);
    query.mergeQuery({field2: "value"});
    expect(query.query).toMatchObject({field: "value", field2: "value"});
  });

});
