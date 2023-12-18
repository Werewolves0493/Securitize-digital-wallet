import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [HttpModule],
  controllers: [ApiController],
  providers: [ApiService],
})
@Module({})
export class ApiModule {}
