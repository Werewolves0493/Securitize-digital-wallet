import { Controller, Get, Param } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private apiService: ApiService) {}

  @Get('getEtherBalance/:address')
  getEtherBalance(@Param('address') address: string) {
    return this.apiService.getEtherBalance(address);
  }

  @Get('getEURandUSDPrice')
  getEURandUSDPrice() {
    return this.apiService.getEURandUSDPrice();
  }

  @Get('getFirstTransactionTime/:address')
  getFirstTransaction(@Param('address') address: string) {
    return this.apiService.getFirstTransaction(address);
  }
}
