import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrgsModule } from './orgs/orgs.module';
import { ReposModule } from './repos/repos.module';

@Module({
  imports: [AuthModule, UsersModule, OrgsModule, ReposModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
