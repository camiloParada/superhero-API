import {
  PrimaryGeneratedColumn,
  BeforeInsert,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Entity,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid4 } from 'uuid';

import { UserStatus } from '../../../common/types/user-status.type';
import { Role } from './role.entity';
import { UserHasPassword } from './user-has-password.entity';

@Entity({ name: 'adm_users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: uuid4;

  @BeforeInsert()
  generateUuid() {
    this.id = uuid4().replace(/-/g, '').toUpperCase();
  }

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 80,
  })
  firstname: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 80,
  })
  lastname: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.active,
  })
  status: string;

  @ApiProperty()
  @Column({ name: 'activation_hash' })
  activationHash: string;

  @ApiProperty()
  @Column({ name: 'expiration_hash', default: () => 'CURRENT_TIMESTAMP' })
  expirationHash: Date;

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

  @ManyToOne(() => Role, (role) => role.users, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  role: number;

  @OneToMany(() => UserHasPassword, (passwords) => passwords.user)
  passwords: UserHasPassword[];
}
