import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { OrgsService } from './orgs.service';
import { Org } from '@prisma/client';
import {CreateOrgDto } from './dto/create-org.dto'


@Controller('orgs')
export class OrgsController {
  constructor(private readonly orgsService: OrgsService) {}

  @Get()
  async listOrgs(): Promise<Org[]> {
    return this.orgsService.orgs({});
  }

  @Post()
  async createOrg(
    @Body() createOrgDto: CreateOrgDto,
  ): Promise<Org> {
    return this.orgsService.createOrg(createOrgDto);
  }

  @Get(':id')
  async getOrgById(@Param('id') id: string): Promise<Org> {
    return this.orgsService.org({ id: Number(id) });
  }

  @Delete(':id')
  async deleteOrg(@Param('id') id: string): Promise<Org> {
    return this.orgsService.deleteOrg({ id: Number(id) });
  }

  @Get('/:id/unassigned_users')
  async getUnassignedUsers(): Promise<Org[]> {
    return this.orgsService.orgs({});
  }

}
