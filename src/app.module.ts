import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ApiModule } from './api/api.module';
import {entities} from "./entities";

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
  }), ApiModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
