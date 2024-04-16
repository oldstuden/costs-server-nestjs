import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { User } from "src/schemas/users.schema";

@Injectable()
export class UserService {
	constructor (@InjectModel(User.name) private usersModel: Model<User>) {}

	async registration (createUserDto: CreateUserDto): Promise<User | null> {
		const existingUser = await this.usersModel.findOne({username: createUserDto.username})

		if (existingUser) {
			return null
		}

		const createUser = new this.usersModel(createUserDto);
		return createUser.save();
	}

}