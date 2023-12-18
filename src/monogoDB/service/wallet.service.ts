import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateWalletDto, UpdateWalletDto } from "../dto/mongoDB.dto";
import { Model } from "mongoose";
import { Wallet } from "../schema/mongoDB.schema";

@Injectable()
export class WalletService {

  constructor(@InjectModel(Wallet.name) private walletModel: Model<Wallet>) { }

  async addWallet(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const existingWallet = await this.walletModel.findOne({ address: createWalletDto.address });

    if (!existingWallet) {
      const newWallet = new this.walletModel(createWalletDto);

      return newWallet.save();
    } else {
      throw new NotFoundException(`Wallet #${createWalletDto.address} already exists`);
    }
  }

  async updateWallet(address: string, updateWalletDto: UpdateWalletDto): Promise<Wallet> {
    const existingWallet = await this.walletModel.findOneAndUpdate({ address: address }, updateWalletDto, { new: true });

    if (!existingWallet) {
      throw new NotFoundException(`wallet #${address} not found`);
    }
    return existingWallet;
  }

  async getAllWallets(): Promise<Wallet[]> {
    const walletData = await this.walletModel.find();
    if (!walletData || walletData.length == 0) {
      return [];
    }
    return walletData;
  }

  async getWallet(address: string): Promise<Wallet> {
    const existingWallet = await this.walletModel.findOne({ address: address });

    if (!existingWallet) {
      throw new NotFoundException(`Wallet #${address} not found`);
    }
    return existingWallet;
  }

  async deleteWallet(address: string): Promise<Wallet> {
    const deletedWallet = await this.walletModel.findOneAndDelete({ address: address });
    if (!deletedWallet) {
      throw new NotFoundException(`Wallet #${address} not found`);
    }
    return deletedWallet;
  }
}