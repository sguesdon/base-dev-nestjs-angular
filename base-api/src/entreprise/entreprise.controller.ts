import { Body, Param, Controller, Get, Post, Put } from '@nestjs/common';
import { EntrepriseService } from './entreprise.service';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { Entreprise } from './schema/entreprise.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
import { BuildQuery } from '../core/rest/decorator';
import { MongoQuery, ElasticQuery, QueryResult } from '../core/rest/query';
import { Roles, Public } from 'nest-keycloak-connect';

@Controller('entreprises')
export class EntrepriseController {

  constructor(private readonly entrepriseService: EntrepriseService) {}

  @Post()
  @Roles({roles: ["admin"]})
  async create(@Body() createEntrepriseDto: CreateEntrepriseDto) : Promise<Entreprise> {
    try {
        const record : Entreprise = await this.entrepriseService.create(createEntrepriseDto);
        return record;
    } catch(err) {
      console.log(Object.keys(err));
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: err._message,
        details: err.errors
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(":id")
  @Roles({roles: ["admin"]})
  async update(@Param('id') id: string, @Body() createEntrepriseDto: CreateEntrepriseDto) : Promise<{data:Entreprise}> {
    try {
        const data : Entreprise = await this.entrepriseService.update(id, createEntrepriseDto);
        return {data};
    } catch(err) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: err._message,
        details: err.errors
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @Public()
  async find(@BuildQuery(MongoQuery) query: MongoQuery): Promise<{data: Entreprise[], total: number}> {
    return await this.entrepriseService.findAndCount(query, true);
  }

  @Get('search')
  @Public()
  async search(@BuildQuery(ElasticQuery) query: ElasticQuery): Promise<QueryResult<Entreprise>> {
    return this.entrepriseService.search(query);
  }

  @Get(":id")
  @Public()
  async findById(@Param('id') id: string): Promise<{data: Entreprise}> {

      let data: Entreprise;

      try {
        data = await this.entrepriseService.findById(id);
      } catch(err) {
        console.log(err);
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: err._message || err.toString(),
          details: err.errors
        }, HttpStatus.BAD_REQUEST);
      }

      if(!data) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: "item not found",
          details: null
        }, HttpStatus.NOT_FOUND);
      }

      return {data};
  }
}
