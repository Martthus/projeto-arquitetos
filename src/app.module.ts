import { Module } from '@nestjs/common';

import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { FormsModule } from '@modules/forms/forms.module';

@Module({
  imports: [UsersModule, AuthModule, FormsModule],
})
export class AppModule {}
