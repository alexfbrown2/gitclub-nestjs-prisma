import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Org } from '@prisma/client';

@Injectable()
export class OrgsService {
  constructor(private prisma: PrismaService) {}

  async org(
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput,
  ): Promise<Org | null> {
    return this.prisma.org.findUnique({
      where: orgWhereUniqueInput,
    });
  }

  async orgs(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrgWhereUniqueInput;
    where?: Prisma.OrgWhereInput;
    orderBy?: Prisma.OrgOrderByWithRelationInput;
  }): Promise<Org[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.org.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createOrg(
    data: Prisma.OrgCreateInput,
  ): Promise<Org> {
    return this.prisma.org.create({
      data,
    });
  }

  async deleteOrg(where: Prisma.OrgWhereUniqueInput): Promise<Org> {
    return this.prisma.org.delete({
      where,
    });
  }
}