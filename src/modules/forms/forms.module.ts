import { Module } from '@nestjs/common';

import { FormsService } from './services/forms.service';
import { FormsController } from './constrollers/forms.controller';
import { formsProviders } from './forms.providers';
import { DatabaseModule } from '@modules/database/database.module';
import { UsersService } from '../users/services/users.service';
import { usersProviders } from '../users/users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FormsController],
  providers: [...formsProviders, ...usersProviders, FormsService, UsersService],
})
export class FormsModule {}
