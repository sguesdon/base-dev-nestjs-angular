import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { EntrepriseModule } from './entreprise/entreprise.module';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_URI') || 'http://localhost:9200'
      })
    })
  ],
  controllers: [],
  providers: [],
  exports: [
    ElasticsearchModule
  ]
})
export class EsModule {}
