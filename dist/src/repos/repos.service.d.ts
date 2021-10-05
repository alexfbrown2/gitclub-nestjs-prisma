import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Repo } from '@prisma/client';
export declare class ReposService {
    private prisma;
    constructor(prisma: PrismaService);
    repo(orgWhereUniqueInput: Prisma.OrgWhereUniqueInput): Promise<Repo | null>;
}
