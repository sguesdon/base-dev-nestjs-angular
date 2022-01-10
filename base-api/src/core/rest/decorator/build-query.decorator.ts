import { QueryParams, BaseQuery, MongoQuery, ElasticQuery} from '../query';

import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

export const BuildQuery = createParamDecorator(
  <T extends BaseQuery>(AnyQuery : typeof BaseQuery, ctx: ExecutionContext) => {
    try {
      const request = ctx.switchToHttp().getRequest();
      return new AnyQuery(<QueryParams> request.query);
    } catch(err) {
      throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: err.message
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
);
