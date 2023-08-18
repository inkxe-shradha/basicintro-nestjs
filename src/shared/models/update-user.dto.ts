import { IsEmail, IsOptional, IsString } from "class-validator";


export class UpdateUserDTO {
    @IsEmail()
    @IsOptional()
    readonly email: string;

    @IsString()
    @IsOptional()
    readonly password: string;
}
