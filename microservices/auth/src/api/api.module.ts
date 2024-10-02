import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  exports: [AuthModule],
  imports: [
    AuthModule,
    UsersModule,
  ],
})
export class ApiModule {}
