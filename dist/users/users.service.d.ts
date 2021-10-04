import { PrismaService } from '../prisma/prisma.service';
export declare type User = any;
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findUserByEmail(email: string): Promise<User | undefined>;
    findUserById(id: number): Promise<User | undefined>;
}
