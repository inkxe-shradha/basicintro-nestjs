import { IsString } from "class-validator";

export class CreateUsersDTO {
    @IsString()
    readonly email: string;

    @IsString()
    readonly password: string;
}
