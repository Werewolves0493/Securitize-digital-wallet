import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateWalletDto, UpdateWalletDto } from '../dto/mongoDB.dto';
import { WalletService } from '../service/wallet.service';

@Controller('wallet')
export class WalletController {

  constructor(private readonly walletService: WalletService) { }

  @Post()
  async addWallet(@Res() response: any, @Body() createWalletDto: CreateWalletDto) {
    try {
      const newWallet = await this.walletService.addWallet(createWalletDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Wallet has been added successfully',
        newWallet,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Wallet not created!',
        error: 'Bad Request'
      });
    }
  }

  @Put('/:address')
  async updateWallet(@Res() response: any, @Param('address') address: string,
    @Body() updateWalletDto: UpdateWalletDto) {
    try {
      const existingWallet = await this.walletService.updateWallet(address, updateWalletDto);

      return response.status(HttpStatus.OK).json({
        message: 'Wallet has been successfully updated',
        existingWallet,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getWallets(@Res() response: any) {
    try {
      const walletData = await this.walletService.getAllWallets();
      return response.status(HttpStatus.OK).json({
        message: 'All Wallet data found successfully', walletData,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:address')
  async getWallet(@Res() response: any, @Param('address') address: string) {
    try {
      const existingWallet = await
        this.walletService.getWallet(address);
      return response.status(HttpStatus.OK).json({
        message: 'Wallet found successfully', existingWallet,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:address')
  async deleteStudent(@Res() response: any, @Param('address') address: string) {
    try {
      const deletedWallet = await this.walletService.deleteWallet(address);
      return response.status(HttpStatus.OK).json({
        message: 'Wallet deleted successfully',
        deletedWallet,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }
}