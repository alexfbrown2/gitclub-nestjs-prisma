import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { Guest } from '../users/entity/guest';
import { OsoInstance } from './oso-instance';

export const Action = (action: string) => SetMetadata('action', action);
export const Resource = (resource: any) => SetMetadata('resource', resource);

export const authorizeFactory = (
  data: string | undefined,
  ctx: ExecutionContext,
) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;
  const action = data || ctx.getHandler().name;
  const oso = request.oso;
  return async (resource: any, checkRead: boolean = true) => {
    const isAllowed = await oso.isAllowed(user, action, resource, {
      checkRead,
    });
    if (!isAllowed) {
      throw new ForbiddenException();
    }
  };
};

export const Authorize = createParamDecorator(authorizeFactory);

@Injectable()
export class OsoGuard implements CanActivate {
  constructor(private reflector: Reflector, private oso: OsoInstance) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // const actor = request.user || new Guest();
    const actor = request.user || {};
    const action =
      this.reflector.get<string[]>('action', context.getHandler()) ||
      context.getHandler().name;
    const resource =
      this.reflector.get<string[]>('resource', context.getHandler()) ||
      this.reflector.get<string[]>('resource', context.getClass()) ||
      context.getClass().name;
    return this.oso.isAllowed(actor, action, resource);
  }
}
