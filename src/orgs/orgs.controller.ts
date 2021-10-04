import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrgsService } from './orgs.service';
import { Org } from '@prisma/client';
import { CreateOrgDto } from './dto/create-org.dto';
import { BasicAuthGuard } from '../auth/basic-auth.guard';
import { Action, Authorize, OsoGuard, Resource } from '../oso/oso.guard';
import { OsoInstance } from '../oso/oso-instance';

@UseGuards(BasicAuthGuard, OsoInstance)
@Controller('orgs')
export class OrgsController {
  constructor(private readonly orgsService: OrgsService) {}

  @Get()
  async listOrgs(): Promise<Org[]> {
    return this.orgsService.orgs({});
  }

  @Post()
  async createOrg(@Body() createOrgDto: CreateOrgDto): Promise<Org> {
    return this.orgsService.createOrg(createOrgDto);
  }

  @Get(':id')
  async getOrgById(
    @Param('id') id: string,
    @Authorize('read') authorize: any,
  ): Promise<Org | undefined> {
    const org = await this.orgsService.org({ id: Number(id) });
    console.log(org);
    await authorize(org);
    return org ? org : undefined;
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
