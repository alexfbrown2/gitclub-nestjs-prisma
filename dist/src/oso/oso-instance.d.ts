import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Oso } from 'oso';
import { PrismaService } from '../prisma/prisma.service';
declare class Issue {
    static model: any;
}
export declare class OsoInstance extends Oso implements CanActivate {
    private prisma;
    constructor(prisma: PrismaService);
    isaCheck: (name: string) => (i: any) => boolean;
    combineQuery: (a: any, b: any) => {
        OR: any[];
    };
    execFromModel: (model: any) => (q: any) => any;
    buildQuery: (constraints: any) => any;
    modelToClass(model: any): typeof Issue;
    canActivate(context: ExecutionContext): boolean;
    unauthorized(): void;
}
export {};
