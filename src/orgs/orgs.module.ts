import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OrgsService } from './orgs.service';
import { OrgsController } from './orgs.controller';
import { OsoInstance } from '../oso/oso-instance';

@Module({
  imports: [PrismaModule],
  controllers: [OrgsController],
  providers: [OrgsService, OsoInstance],
  exports: [OrgsService],
})
export class OrgsModule {}
