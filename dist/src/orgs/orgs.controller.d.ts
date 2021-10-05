import { OrgsService } from './orgs.service';
import { Org } from '@prisma/client';
import { CreateOrgDto } from './dto/create-org.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class OrgsController {
    private readonly orgsService;
    private readonly prisma;
    constructor(orgsService: OrgsService, prisma: PrismaService);
    listOrgs(request: any): Promise<Org[]>;
    createOrg(createOrgDto: CreateOrgDto, authorize: any, request: any): Promise<Org>;
    getOrgById(id: string, authorize: any): Promise<Org | null>;
    deleteOrg(id: string, authorize: any): Promise<Org>;
}
