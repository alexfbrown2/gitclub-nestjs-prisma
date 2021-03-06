import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { BasicAuthGuard } from './basic-auth.guard';
import { BasicStrategy } from './basic-auth.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, BasicStrategy, BasicAuthGuard],
  exports: [AuthService, BasicStrategy, BasicAuthGuard],
})
export class AuthModule {}
