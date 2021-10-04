import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: number): Promise<User | undefined> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  //   async allRepos(request: Request) {
  //     const user = await prisma.user.findUnique({
  //       where: { id: request.params.id },
  //     });
  //     await request.oso.authorize(request.user, 'read_profile', user);
  //     return await request.oso.authorizedResources(user, 'read', prisma.repo);
  //   }
}
