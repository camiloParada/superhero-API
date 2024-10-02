import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { Not, Repository } from 'typeorm';

import { FilterUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import config from '../../../config';

@Injectable()
export class UsersService {
  expirationTime: number;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {
    this.expirationTime = parseInt(
      this.configService.activationHash.expirationTime,
    );
  }

  async findAll(params?: FilterUserDto) {
    try {
      if (Object.keys(params).length > 0) {
        const { limit, offset } = params;

        const [rows, count] = await this.userRepo.findAndCount({
          where: { status: Not('DELETED') },
          relations: ['role'],
          take: limit,
          skip: offset,
          order: { createdAt: 'DESC' },
        });

        return { rows, count };
      }

      const [rows, count] = await this.userRepo.findAndCount({
        where: { status: Not('DELETED') },
        relations: ['role'],
        order: { createdAt: 'DESC' },
      });

      return { rows, count };
    } catch (err) {
      throw new HttpException(
        'Failed try to get all registers',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string, withPasswords?: boolean) {
    let user;

    if (withPasswords) {
      user = await this.userRepo.findOne({
        where: { id },
        relations: ['role', 'passwords'],
      });
    } else {
      user = await this.userRepo.findOne({
        where: { id },
        relations: ['role'],
      });
    }

    if (!user) {
      throw new HttpException(
        `Failed try to get register with id ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return user;
  }

  findByEmail(email: string, withInactives = true) {
    if (withInactives) {
      return this.userRepo.findOne({
        where: { email },
        relations: ['role', 'passwords'],
      });
    }

    return this.userRepo.findOne({
      where: { email, status: 'ACTIVE' },
      relations: ['role', 'passwords'],
    });
  }
}
