import { PartialType } from "@nestjs/mapped-types";

export class CreateWalletDto {
    address: string;
    isFavorite: number;
}

export class CreateRateDto {
    usd: number;
    eur: number;
}

export class UpdateWalletDto extends PartialType(CreateWalletDto) {}
export class UpdateRateDto extends PartialType(CreateRateDto) {}