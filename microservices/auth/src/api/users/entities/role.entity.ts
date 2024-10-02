import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { GeneralStatus } from '../../../common/types/general-status.type';
import { User } from './user.entity';

@Entity({ name: 'adm_roles' })
export class Role {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 50,
  })
  role: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: GeneralStatus,
    default: GeneralStatus.active,
  })
  status: string;

  @ApiProperty()
  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty()
  @Column({
    name: 'updated_at',
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => User, (users) => users.role)
  users: User[];
}
