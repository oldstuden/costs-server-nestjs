import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AuthControlller } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [UsersModule],
	controllers: [AuthControlller],
	providers: [AuthService],
	exports: [AuthService],
})

export class AuthModule {}