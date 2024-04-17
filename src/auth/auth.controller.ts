import { Body, Controller, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Response } from "express";
import { AuthGuard } from "./guards/registration.guards";


@Controller('auth')
export class AuthControlller {
	constructor( private usersService: UsersService){}

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