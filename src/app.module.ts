import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrgsModule } from './orgs/orgs.module';

@Module({
  imports: [AuthModule, UsersModule, OrgsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
