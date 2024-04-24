import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";

@Injectable()
export class RefreshJwtGuard implements CanActivate {
	constructor(private usersService: UsersService) {}
		async canActivate(context: ExecutionContext,
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	        // @ts-ignore
    ): boolean | Promise<boolean> | Observable<boolean> {
	const request = context.switchToHttp().getRequest();

	const {refresh_token, username} = request.body;

	if (!refresh_token) {
		throw new UnauthorizedException('Field refresh_token is required')
	}

	if (!username) {
		throw new UnauthorizedException('Field username is required')
	}

	const user = await this.usersService.findOne(username);

    if (!user) {
		throw new UnauthorizedException('User does not exist')
	}

	return true;
	}
}