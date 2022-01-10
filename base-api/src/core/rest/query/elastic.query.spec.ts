import { Test, TestingModule } from '@nestjs/testing';
import { ElasticQuery } from './elastic.query';
import { QueryParams } from './query.params';

describe('ElasticQuery offset', () => {

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
      const query = new ElasticQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid offset param');
    }
  });

  it('invalid offset (neg number)', () => {
    expect.assertions(2);
    try {
      params.offset = -10;
      const query = new ElasticQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid offset param');
    }
  });

  it('valid offset', () => {
      params.offset = 5;
      const query = new ElasticQuery(params);
      expect(query.offset).toBe(5);
  });
});

describe('ElasticQuery limit', () => {

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
      const query = new ElasticQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid limit param');
    }
  });

  it('invalid limit (neg number)', () => {
    expect.assertions(2);
    try {
      params.limit = -10;
      const query = new ElasticQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid limit param');
    }
  });

  it('valid limit', () => {
      params.limit = 5;
      const query = new ElasticQuery(params);
      expect(query.limit).toBe(5);
  });
});

describe('ElasticQuery query', () => {

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
      const query = new ElasticQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid query param');
    }
  });

  it('invalid query (json array)', () => {
    expect.assertions(2);
    try {
      params.query = '["toto", "titi"]';
      const query = new ElasticQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid query param');
    }
  });

  it('valid query', () => {
      params.query = '{"field":"value"}';
      const query = new ElasticQuery(params);
      expect(query.query).toMatchObject({field: "value"});
  });

});

describe('ElasticQuery sort', () => {

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
      const query = new ElasticQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid sort param');
    }
  });

  it('invalid sort (json object)', () => {
    expect.assertions(2);
    try {
      params.sort = '{"field":true}';
      const query = new ElasticQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid sort param');
    }
  });

  it('valid sort', () => {
      params.sort = '[{"toto":"desc"}, {"titi": "asc"}]';
      const query = new ElasticQuery(params);
      expect(query.sort).toMatchObject([{toto:"desc"}, {titi: "asc"}]);
  });

});

describe('ElasticQuery fields', () => {

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
      const query = new ElasticQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid fields param');
    }
  });

  it('invalid fields (json array)', () => {
    expect.assertions(2);
    try {
      params.fields = '{"toto": "titi"}';
      const query = new ElasticQuery(params);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'invalid fields param');
    }
  });

  it('valid sort', () => {
      params.fields = '["field"]';
      const query = new ElasticQuery(params);
      expect(query.fields).toMatchObject(["field"]);
  });

});

describe('ElasticQuery operations', () => {

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
    const query = new ElasticQuery(params);
    query.mergeQuery({field2: "value"});
    expect(query.query).toMatchObject({field: "value", field2: "value"});
  });

});
