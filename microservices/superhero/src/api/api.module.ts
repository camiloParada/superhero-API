import { Module } from '@nestjs/common';
import { SuperheroesModule } from './superheroes/superheroes.module';

@Module({
  exports: [SuperheroesModule],
  imports: [SuperheroesModule],
})
export class ApiModule {}
