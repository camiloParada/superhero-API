import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

import config from './config';

@Injectable()
export class AppService {
  private accessToken: string;

  constructor(
    private readonly httpService: HttpService,
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
  ) {
    this.accessToken = this.configService.apiToken;
  }

  async getHeroById(id: number) {
    const response = await this.httpService.get(
      `https://superheroapi.com/api/${this.accessToken}/${id}`,
    );

    return this.returnData(response);
  }

  async getPowerstatsByHeroId(id: number) {
    const response = await this.httpService.get(
      `https://superheroapi.com/api/${this.accessToken}/${id}/powerstats`,
    );

    return this.returnData(response);
  }

  async getBiographyByHeroId(id: number) {
    const response = await this.httpService.get(
      `https://superheroapi.com/api/${this.accessToken}/${id}/biography`,
    );

    return this.returnData(response);
  }

  async getAppearanceByHeroId(id: number) {
    const response = await this.httpService.get(
      `https://superheroapi.com/api/${this.accessToken}/${id}/appearance`,
    );

    return this.returnData(response);
  }

  async getWorkByHeroId(id: number) {
    const response = await this.httpService.get(
      `https://superheroapi.com/api/${this.accessToken}/${id}/work`,
    );

    return this.returnData(response);
  }

  async getConnectionsByHeroId(id: number) {
    const response = await this.httpService.get(
      `https://superheroapi.com/api/${this.accessToken}/${id}/connections`,
    );

    return this.returnData(response);
  }

  async getImageByHeroId(id: number) {
    const response = await this.httpService.get(
      `https://superheroapi.com/api/${this.accessToken}/${id}/image`,
    );

    return this.returnData(response);
  }

  private async returnData(response: Observable<AxiosResponse>) {
    const result = await lastValueFrom(response);
    return result.data;
  }
}
