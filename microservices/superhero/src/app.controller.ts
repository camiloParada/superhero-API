import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AppService } from './app.service';
import { SuperheroesService } from './api/superheroes/services/superheroes.service';

@Controller('api/superhero')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly superheroesService: SuperheroesService,
  ) {}

  @MessagePattern({ cmd: 'getSuperheroes' })
  getSuperheroes() {
    return this.superheroesService.findAll();
  }

  @MessagePattern({ cmd: 'getSuperhero' })
  getSuperhero(data: { id: number }) {
    return this.appService.getHeroById(data.id);
  }

  @MessagePattern({ cmd: 'getSuperheroPowerstats' })
  getPowerstats(data: { id: number }) {
    return this.appService.getPowerstatsByHeroId(data.id);
  }

  @MessagePattern({ cmd: 'getSuperheroBiography' })
  getBiography(data: { id: number }) {
    return this.appService.getBiographyByHeroId(data.id);
  }

  @MessagePattern({ cmd: 'getSuperheroAppearance' })
  getAppearance(data: { id: number }) {
    return this.appService.getAppearanceByHeroId(data.id);
  }

  @MessagePattern({ cmd: 'getSuperheroWork' })
  getWork(data: { id: number }) {
    return this.appService.getWorkByHeroId(data.id);
  }

  @MessagePattern({ cmd: 'getSuperheroConnections' })
  getConnections(data: { id: number }) {
    return this.appService.getConnectionsByHeroId(data.id);
  }

  @MessagePattern({ cmd: 'getSuperheroImage' })
  getImage(data: { id: number }) {
    return this.appService.getImageByHeroId(data.id);
  }
}
