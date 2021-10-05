import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ReposService } from './repos.service';
import { ReposController } from './repos.controller';
import { OsoInstance } from '../oso/oso-instance';

@Module({
  imports: [PrismaModule],
  controllers: [ReposController],
  providers: [ReposService, OsoInstance],
  exports: [ReposService],
})
export class ReposModule {}
