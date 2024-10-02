import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { JwtAuthGuard } from './guards/auth.guard';

@Controller('api')
export class AppController {
  constructor(
    @Inject('SUPERHERO_SERVICE') private readonly client: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Post('auth')
  async login(@Body() payload: { email: string; password: string }) {
    const response = await lastValueFrom(
      this.authClient.send({ cmd: 'login' }, { payload }),
    );

    if (response.error) {
      throw new HttpException(response.message, response.error);
    }

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('superheroes')
  getSuperheroes() {
    return this.client.send({ cmd: 'getSuperheroes' }, {});
  }

  @UseGuards(JwtAuthGuard)
  @Get('superhero/:id')
  getSuperheroData(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'getSuperhero' }, { id });
  }

  @UseGuards(JwtAuthGuard)
  @Get('superhero/:id/appearance')
  getSuperheroAppearance(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'getSuperheroAppearance' }, { id });
  }

  @UseGuards(JwtAuthGuard)
  @Get('superhero/:id/biography')
  getSuperheroBiography(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'getSuperheroBiography' }, { id });
  }

  @UseGuards(JwtAuthGuard)
  @Get('superhero/:id/connections')
  getSuperheroConnections(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'getSuperheroConnections' }, { id });
  }

  @UseGuards(JwtAuthGuard)
  @Get('superhero/:id/image')
  getSuperheroImage(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'getSuperheroImage' }, { id });
  }

  @UseGuards(JwtAuthGuard)
  @Get('superhero/:id/powerstats')
  getSuperheroPowerstats(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'getSuperheroPowerstats' }, { id });
  }

  @UseGuards(JwtAuthGuard)
  @Get('superhero/:id/work')
  getSuperheroWork(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'getSuperheroWork' }, { id });
  }
}
