import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UsersSchema } from "src/schemas/users.schema";

@Module({
	imports:[
		MongooseModule.forFeature([{name: User.name, schema: UsersSchema}])
	],
	providers: [UsersService],
	exports: [UsersService],
})

export class UsersModule {}