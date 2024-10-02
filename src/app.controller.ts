import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('api')
export class AppController {
  constructor(
    @Inject('SUPERHERO_SERVICE') private readonly client: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Get('auth')
  login() {
    return this.authClient.send({ cmd: 'login' }, {});
  }

  @Get('superhero/:id')
  getSuperheroData(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'getSuperhero' }, { id });
  }

  @Get('superhero/:id/appearance')
  getSuperheroAppearance(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'getSuperheroAppearance' }, { id });
  }

  @Get('superhero/:id/biography')
  getSuperheroBiography(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'getSuperheroBiography' }, { id });
  }

  @Get('superhero/:id/connections')
  getSuperheroConnections(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'getSuperheroConnections' }, { id });
  }

  @Get('superhero/:id/image')
  getSuperheroImage(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'getSuperheroImage' }, { id });
  }

  @Get('superhero/:id/powerstats')
  getSuperheroPowerstats(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'getSuperheroPowerstats' }, { id });
  }

  @Get('superhero/:id/work')
  getSuperheroWork(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'getSuperheroWork' }, { id });
  }
}
