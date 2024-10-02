import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { GeneralStatus } from '../../../common/types/general-status.type';
import { User } from './user.entity';

@Entity({ name: 'adm_user_has_password' })
export class UserHasPassword {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  password: string;

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

  @ManyToOne(() => User, (user) => user.passwords, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: string;
}
