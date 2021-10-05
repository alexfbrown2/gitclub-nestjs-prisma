import { ReposService } from './repos.service';
import { Repo } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class ReposController {
    private readonly reposService;
    private readonly prisma;
    constructor(reposService: ReposService, prisma: PrismaService);
    listRepos(orgId: string, request: any): Promise<Repo[]>;
}
