import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { EntrepriseModule } from './entreprise/entreprise.module';
import { APP_GUARD } from '@nestjs/core';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
  PolicyEnforcementMode,
  TokenValidation
} from 'nest-keycloak-connect';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService : ConfigService) => ({
        authServerUrl: configService.get('KEYCLOAK_ENDPOINT') || 'http://localhost:8080/auth',
        realm: configService.get('KEYCLOAK_REALM') || 'master',
        clientId: configService.get('KEYCLOAK_CLIENTID') || 'base-api',
        secret: configService.get('KEYCLOAK_SECRET') || '',
        cookieKey: configService.get('KEYCLOAK_SECRET') || '',
        logLevels: ['warn'],
        useNestLogger: true,
        tokenValidation: TokenValidation.OFFLINE,
      })
    }),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_URI') || 'http://localhost:9200'
      })
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') || 'mongodb://localhost/nest'
      })
    }),
    EntrepriseModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    }
  ]
})
export class AppModule {}
