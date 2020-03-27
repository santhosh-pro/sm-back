import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ApiModule } from './api/api.module';
import {entities} from "./entities";
import { TemplateController } from './template/template.controller';
import { TemplateService } from './template/template.service';
import { TemplateModule } from './template/template.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'nativeuser',
    password: 'password123',
    database: 'bb',
    entities,
    synchronize: true,
  }), ApiModule, TemplateModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
