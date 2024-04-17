import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AuthControlller } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Module({
	imports: [
	  UsersModule,
	  JwtModule.register({
       global: true,
       secret: jwtConstants.secret,
       signOptions: { expiresIn: '30s' },
      }),

	],
	controllers: [AuthControlller],
	providers: [AuthService],
	exports: [AuthService],
})

export class AuthModule {}