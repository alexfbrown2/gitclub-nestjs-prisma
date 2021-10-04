import { OrgsService } from './orgs.service';
import { Org } from '@prisma/client';
import { CreateOrgDto } from './dto/create-org.dto';
export declare class OrgsController {
    private readonly orgsService;
    constructor(orgsService: OrgsService);
    listOrgs(): Promise<Org[]>;
    createOrg(createOrgDto: CreateOrgDto): Promise<Org>;
    getOrgById(id: string, authorize: any): Promise<Org | undefined>;
    deleteOrg(id: string): Promise<Org>;
    getUnassignedUsers(): Promise<Org[]>;
}
