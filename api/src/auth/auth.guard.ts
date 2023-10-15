import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  Permission,
  permissionMetadata,
  publicEndpointMetadata,
} from './auth.interface';
import { User } from './../user/user.entity';
import { UserTier } from './../user/user.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.get<boolean>(
      publicEndpointMetadata,
      context.getHandler(),
    );
    return isPublic || request.isAuthenticated();
  }
}

export const Public = () => SetMetadata(publicEndpointMetadata, true);

export const SetPermissions = (permissions: Permission[]) =>
  SetMetadata(permissionMetadata, permissions);

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.get<boolean>(
      publicEndpointMetadata,
      context.getHandler(),
    );
    const allowedPermissisons =
      this.reflector.get<Permission[]>(
        permissionMetadata,
        context.getHandler(),
      ) || [];
    const user = request?.user as Partial<User>;
    return (
      isPublic ||
      (user &&
        (allowedPermissisons.includes(user.userTier as Permission) ||
          user.userTier === UserTier.SUPER))
    );
  }
}
