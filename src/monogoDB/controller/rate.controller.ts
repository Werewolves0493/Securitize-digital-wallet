import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { RateService } from '../service/rate.service';
import { CreateRateDto } from '../dto/mongoDB.dto';

@Controller('rate')
export class RateController {

  constructor(private readonly rateService: RateService) { }

  @Post()
  async addRate(@Res() response: any, @Body() createRateDto: CreateRateDto) {
    try {
      const rate = await this.rateService.addRate(createRateDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'rate has been added successfully',
        rate,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: rate not created!',
        error: 'Bad Request'
      });
    }
  }

  @Get()
  async getRate(@Res() response: any) {
    try {
      const rate = await this.rateService.getRate();
      return response.status(HttpStatus.OK).json({
        message: 'Rate data found successfully', rate,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

}