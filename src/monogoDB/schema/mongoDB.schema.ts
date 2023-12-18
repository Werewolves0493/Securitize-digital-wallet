import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Wallet {
   @Prop()
   address: string;
   @Prop()
   isFavorite: number;
}

@Schema()
export class Rate {
   @Prop()
   usd: number;
   @Prop()
   eur: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
export const RateSchema = SchemaFactory.createForClass(Rate);