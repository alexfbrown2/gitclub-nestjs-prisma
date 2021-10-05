import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Repo } from '@prisma/client';

@Injectable()
export class ReposService {
  constructor(private prisma: PrismaService) {}

  async repo(
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput,
  ): Promise<Repo | null> {
    return this.prisma.repo.findUnique({
      where: orgWhereUniqueInput,
    });
  }
}
