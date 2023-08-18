import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare, genSaltSync, hashSync } from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) { }
    private readonly saltRound = 10;

    async signin(email: string, password: string) {
        // * See if the user is exit or not.
        const [user] = await this.userService.find(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const isMatch = await compare(password, user.password);

        // * See if the user password matches
        if (!isMatch) {
            throw new NotFoundException('User name or password does not match');
        }

        // * return the users.
        return user;
    }

    async signup(email: string, password: string) {
        // * See if the email is in use
        const users = await this.userService.find(email);
        if (users.length) {
            throw new BadRequestException(
                'Email is already in use!'
            )
        }
        // * Hash the users password
        const salt = genSaltSync(10);
        const hashPassword = hashSync(password, salt);

        // * Create a new user and save it
        const user = await this.userService.createUser(email, hashPassword)

        // * Return the user instance
        return user;
    }
}
