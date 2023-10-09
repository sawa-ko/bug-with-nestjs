import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { LoadStrategy } from '@mikro-orm/core';
import {
  AuthUserEntity,
  ProjectEntity,
  ProjectMembersEntity,
} from './entities/entities';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      clientUrl: 'postgresql://postgres:Sawa-ko-Sawa@localhost:5432/test',
      autoLoadEntities: true,
      driver: PostgreSqlDriver,
      forceEntityConstructor: true,
      loadStrategy: LoadStrategy.JOINED,
      ensureDatabase: true,
      migrations: {
        path: './dist/migrations',
        pathTs: './src/migrations',
      },
    }),
    MikroOrmModule.forFeature({
      entities: [AuthUserEntity, ProjectMembersEntity, ProjectEntity],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
