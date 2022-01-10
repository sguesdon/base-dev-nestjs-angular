import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntrepriseController } from './entreprise.controller';
import { EntrepriseService } from './entreprise.service';
import { Entreprise, EntrepriseSchema } from './schema/entreprise.schema';
import { ElasticsearchService } from '@nestjs/elasticsearch';
var mexp = require('mongoose-elasticsearch-xp').v7;
import { EsModule } from '../es.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Entreprise.name,
        imports: [EsModule],
        inject: [ElasticsearchService],
        useFactory: (client: ElasticsearchService) => {
          const schema = EntrepriseSchema;
          schema.plugin(mexp, { client });
          return schema;
        }
      },
    ]),
  ],
  controllers: [EntrepriseController],
  providers: [EntrepriseService],
})
export class EntrepriseModule {}
