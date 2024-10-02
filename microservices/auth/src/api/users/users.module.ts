import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './services/users.service';
import { RolesService } from './services/roles.service';
import { Role } from './entities/role.entity';
import { UserHasPassword } from './entities/user-has-password.entity';
import { User } from './entities/user.entity';

@Module({
  exports: [TypeOrmModule, UsersService, RolesService],
  imports: [
    TypeOrmModule.forFeature([Role, User, UserHasPassword]),
  ],
  providers: [UsersService, RolesService],
})
export class UsersModule {}
