import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService) {}
  async canActivate(
    context: ExecutionContext,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
	const {username} = request.body;
	const user = await this.authService.validateUser(username);

	if (user) {
		throw new UnauthorizedException(
			`User with ${username} already exists`
		)
	}
    return true;
  }
}