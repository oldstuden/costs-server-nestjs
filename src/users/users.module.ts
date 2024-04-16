import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UsersSchema } from "src/schemas/users.schema";

@Module({
	imports:[
		MongooseModule.forFeature([{name: User.name, schema: UsersSchema}])
	],
	providers: [UserService],
	exports: [UserService],
})

export class UsersModule {}