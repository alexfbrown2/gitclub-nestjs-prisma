import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Oso } from 'oso';
import { PrismaService } from '../prisma/prisma.service';
export declare class OsoInstance extends Oso implements CanActivate {
    private prisma;
    constructor(prisma: PrismaService);
    isaCheck: (name: string) => (i: any) => boolean;
    combineQuery: (a: any, b: any) => {
        OR: any[];
    };
    execFromModel: (model: any) => (q: any) => any;
    buildQuery: (constraints: any) => any;
    canActivate(context: ExecutionContext): boolean;
    unauthorized(): void;
}
