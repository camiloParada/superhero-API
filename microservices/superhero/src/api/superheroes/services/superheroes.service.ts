import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Superhero } from '../entities/superhero.entity';

@Injectable()
export class SuperheroesService {
  constructor(
    @InjectRepository(Superhero) private superheroRepo: Repository<Superhero>,
  ) {}

  async findAll() {
    const [rows, count] = await this.superheroRepo
      .createQueryBuilder('superheroes')
      .getManyAndCount();

    return { rows, count };
  }
}
