import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { BasicAuthGuard } from './basic-auth.guard';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy, BasicAuthGuard],
  exports: [AuthService, LocalStrategy, BasicAuthGuard],
})
export class AuthModule {}
