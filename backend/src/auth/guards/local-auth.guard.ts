// src/auth/guards/local-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  // Simply rely on the underlying authentication mechanism without session handling
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // The 'super.canActivate(context)' effectively validates the user credentials
    return (await super.canActivate(context)) as boolean;
  }
}
