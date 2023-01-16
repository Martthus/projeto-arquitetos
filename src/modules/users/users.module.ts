import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...usersProviders,
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
