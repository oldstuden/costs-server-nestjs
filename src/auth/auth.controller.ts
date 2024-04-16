import { Controller } from "@nestjs/common";
import { UserService } from "src/users/users.service";


@Controller('auth')
export class AuthControlller {
	constructor( private usersService: UserService){}
	
}