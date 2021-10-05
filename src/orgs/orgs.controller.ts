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
import { OrgsService } from './orgs.service';
import { Org } from '@prisma/client';
import { CreateOrgDto } from './dto/create-org.dto';
import { BasicAuthGuard } from '../auth/basic-auth.guard';
import { Action, Authorize, OsoGuard, Resource } from '../oso/oso.guard';
import { OsoInstance } from '../oso/oso-instance';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(BasicAuthGuard, OsoInstance)
@Controller('orgs')
export class OrgsController {
  constructor(
    private readonly orgsService: OrgsService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async listOrgs(@Req() request): Promise<Org[]> {
    return await request.oso.authorizedResources(
      request.user,
      'read',
      this.prisma.org,
    );
  }

  @Post()
  async createOrg(
    @Body() createOrgDto: CreateOrgDto,
    @Authorize('create') authorize: any,
    @Req() request,
  ): Promise<Org> {
    await authorize({ typename: 'Org' }, false);
    const org = await this.orgsService.createOrg(createOrgDto);
    await this.prisma.orgRole.create({
      data: { orgId: org.id, userId: request.user.id, role: 'owner' },
    });
    return org;
  }

  @Get(':id')
  async getOrgById(
    @Param('id') id: string,
    @Authorize('read') authorize: any,
  ): Promise<Org | null> {
    const org = await this.orgsService.org({ id: Number(id) });
    await authorize(org);
    return org;
  }

  @Delete(':id')
  async deleteOrg(
    @Param('id') id: string,
    @Authorize('delete') authorize: any,
  ): Promise<Org> {
    const orgToRemove = await this.orgsService.org({ id: Number(id) });
    console.log(orgToRemove);
    await authorize(orgToRemove);
    return this.prisma.org.delete({
      where: {
        id: orgToRemove.id,
      },
    });
  }

  //   @Get('/:id/unassigned_users')
  //   async getUnassignedUsers(): Promise<Org[]> {
  //     return this.orgsService.orgs({});
  //   }
}
