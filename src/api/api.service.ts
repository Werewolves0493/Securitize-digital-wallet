import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { ethers } from 'ethers';

@Injectable()
export class ApiService {
  constructor(private http: HttpService) { }

  async getEtherBalance(address: string): Promise<string> {
    const response = await axios
      .get(
        `${process.env.ETHERSCAN_API_URL}?module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`,
      )
      .catch(() => {
        throw new ForbiddenException('API not available');
      });

    const data = response.data;

    return ethers.formatEther(data.result);
  }

  async getEURandUSDPrice(): Promise<any> {
    const coinID = 'ethereum';
    const EUR = 'eur';
    const USD = 'usd';

    // const response = await axios
    //   .get(`${process.env.ETHERSCAN_API_URL}?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API_KEY}`)
    //   .catch(() => {
    //     throw new ForbiddenException('API not available');
    //   });

    const response = await axios
      .get(`${process.env.COINGECKO_URL}/v3/simple/price?ids=${coinID}&vs_currencies=${EUR}%2C${USD}`)
      .catch(() => {
        throw new ForbiddenException('API not available');
      });

    const data = response.data;

    return data;
  }

  async getFirstTransaction(address: string): Promise<any> {
    const response = await axios
      .get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`)
      .catch(() => {
        throw new ForbiddenException('API not available');
      });

    const data = response.data.result.length > 0 ? response.data.result[0].timeStamp : '0';
    
    // return new Date(Number(data) * 1000).toUTCString();
    return data;
  }
}
