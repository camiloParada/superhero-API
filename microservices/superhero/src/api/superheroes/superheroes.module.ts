import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SuperheroesService } from './services/superheroes.service';
import { Superhero } from './entities/superhero.entity';

@Module({
  exports: [TypeOrmModule, SuperheroesService],
  imports: [TypeOrmModule.forFeature([Superhero])],
  providers: [SuperheroesService],
})
export class SuperheroesModule {}
