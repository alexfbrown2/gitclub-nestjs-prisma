import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReposService } from './repos.service';
import { Repo } from '@prisma/client';
// import { CreateOrgDto } from './dto/create-org.dto';
import { BasicAuthGuard } from '../auth/basic-auth.guard';
import { Action, Authorize, OsoGuard, Resource } from '../oso/oso.guard';
import { OsoInstance } from '../oso/oso-instance';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(BasicAuthGuard, OsoInstance)
@Controller('orgs/:orgId/repos')
export class ReposController {
  constructor(
    private readonly reposService: ReposService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async listRepos(
    @Param('orgId') orgId: string,
    @Req() request,
  ): Promise<Repo[]> {
    console.log('listing repos');
    const repoFilter = await request.oso.authorizedQuery(
      request.user,
      'read',
      this.prisma.repo,
    );
    return this.prisma.repo.findMany({
      where: {
        AND: [repoFilter, { orgId: Number(orgId) }],
      },
    });
  }
}
