import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findUserByEmail(email: string): Promise<User | null>;
    findUserById(id: number): Promise<User | null>;
}
