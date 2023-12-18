import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Wallet, WalletSchema, Rate, RateSchema } from "./schema/mongoDB.schema";
import { WalletController } from "./controller/wallet.controller";
import { WalletService } from "./service/wallet.service";
import { RateController } from "./controller/rate.controller";
import { RateService } from "./service/rate.service";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://127.0.0.1:27017',
        dbName: 'Wallet',
      }),
    }),
    MongooseModule.forFeature([{
      name: Wallet.name, schema: WalletSchema
    }, { name: Rate.name, schema: RateSchema }])
  ],
  controllers: [WalletController, RateController],
  providers: [WalletService, RateService],
  exports: []
})

export class MongoDBModule { }
