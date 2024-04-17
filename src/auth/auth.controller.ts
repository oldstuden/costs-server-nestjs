import { Body, Controller, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Response } from "express";
import { AuthGuard } from "./guards/registration.guards";
import { LoginUserDto } from "./dto/login-user-dto";
import { LoginGuard } from "./guards/login.guards";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthControlller {
	constructor(
		private usersService: UsersService,
		private authService: AuthService
	   ){}

	@UseGuards(LoginGuard)
	@Post('login')
	async loginUser(
		@Body() loginUserDto: LoginUserDto,
		@Res() res: Response,
	) {
    const user = await this.usersService.login(loginUserDto);

	const access = await this.authService.generateAccessToken(user);
	const refresh = await this.authService.generateRefreshToken(user._id as string);

	res.statusCode = HttpStatus.OK;
	return res.send({...access, ...refresh, username: user.username});
	};

	@UseGuards(AuthGuard)
	@Post('signup')
	async registrationUser(
		@Body() createUserDto: CreateUserDto,
		@Res() res: Response,
	) {
    await this.usersService.registration(createUserDto);

	res.statusCode = HttpStatus.CREATED;
	return res.send('user created');
	};
}