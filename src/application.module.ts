import { Module } from '@nestjs/common';
import Next from 'next';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';
import { RenderModule } from 'nest-next';
import { resolve } from 'path';
import { MongoDBModule } from './monogoDB/mongoDB.module';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        dir: resolve(__dirname, '..'),
      }),
      { passthrough404: true, viewsDir: null },
    ),
    ApiModule,
    MongoDBModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
