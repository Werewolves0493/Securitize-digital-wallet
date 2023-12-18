import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Rate } from "../schema/mongoDB.schema";
import { CreateRateDto } from "../dto/mongoDB.dto";

@Injectable()
export class RateService {

  constructor(@InjectModel(Rate.name) private rateModel: Model<Rate>) { }

  async addRate(createRateDto: CreateRateDto): Promise<Rate> {
    const existedRate = await this.rateModel.find();
    if (!existedRate || existedRate.length === 0) {
      const newWallet = new this.rateModel(createRateDto);
      return newWallet.save();
    } else {
      const updated = await this.rateModel.findOneAndUpdate({ usd: existedRate[0].usd }, createRateDto, { new: true });
      if (!updated) {
        throw new NotFoundException(`rate entry not found`);
      } else {
        return updated;
      }
    }
  }


  async getRate(): Promise<Rate> {
    const existedRate = await this.rateModel.find();

    if (!existedRate || existedRate.length === 0) {
      return { usd: 0, eur: 0 };
    }
    return existedRate[0];
  }

}