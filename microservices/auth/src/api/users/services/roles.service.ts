import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { FilterRoleDto } from '../dtos/role.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepo: Repository<Role>,
  ) {}

  async findAll(params?: FilterRoleDto) {
    try {
      if (Object.keys(params).length > 0) {
        const { limit, offset } = params;

        const [rows, count] = await this.roleRepo.findAndCount({
          where: { status: Not('DELETED') },
          take: limit,
          skip: offset,
          order: { createdAt: 'DESC' },
        });

        return { rows, count };
      }

      const [rows, count] = await this.roleRepo.findAndCount({
        where: { status: Not('DELETED') },
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

  async findOne(id: number) {
    const role = await this.roleRepo.findOneBy({
      id,
      status: Not('DELETED'),
    });

    if (!role) {
      throw new HttpException(
        `Failed try to get register with id ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return role;
  }
}
