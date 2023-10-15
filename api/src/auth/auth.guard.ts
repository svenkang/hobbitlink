import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { publicEndpoint } from './auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.get<boolean>(
      publicEndpoint,
      context.getHandler(),
    );
    return isPublic || request.isAuthenticated();
  }
}

export const IsPublic = () => SetMetadata(publicEndpoint, true);
