import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OsoInstance } from './oso-instance';
export declare const Action: (action: string) => import("@nestjs/common").CustomDecorator<string>;
export declare const Resource: (resource: any) => import("@nestjs/common").CustomDecorator<string>;
export declare const authorizeFactory: (data: string | undefined, ctx: ExecutionContext) => (resource: any, checkRead?: boolean) => Promise<void>;
export declare const Authorize: (...dataOrPipes: (string | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
export declare class OsoGuard implements CanActivate {
    private reflector;
    private oso;
    constructor(reflector: Reflector, oso: OsoInstance);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
