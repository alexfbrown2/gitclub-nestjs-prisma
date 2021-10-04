import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Org } from '@prisma/client';
export declare class OrgsService {
    private prisma;
    constructor(prisma: PrismaService);
    org(orgWhereUniqueInput: Prisma.OrgWhereUniqueInput): Promise<Org | null>;
    orgs(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.OrgWhereUniqueInput;
        where?: Prisma.OrgWhereInput;
        orderBy?: Prisma.OrgOrderByWithRelationInput;
    }): Promise<Org[]>;
    createOrg(data: Prisma.OrgCreateInput): Promise<Org>;
    deleteOrg(where: Prisma.OrgWhereUniqueInput): Promise<Org>;
}
