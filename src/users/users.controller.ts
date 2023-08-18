import { Controller, Post, Body, Get, Param, Query, Delete, Patch, ClassSerializerInterceptor, UseInterceptors, Session, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDTO } from 'src/shared/models/users.dto';
import { UpdateUserDTO } from 'src/shared/models/update-user.dto';
import { Serialize } from 'src/shared/interceptor/serialize/serialize.interceptor';
import { UserDTO } from 'src/shared/models/user-formatt.dto';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { CurrentUserInterceptor } from './Interceptor/current-user.interceptor';
import { User } from './user.entity';
import { AuthGuard } from 'src/guard/auth.guard';


@Controller('auth')
@Serialize(UserDTO)
// @UseInterceptors(CurrentUserInterceptor) // * TD approaches to over come this we need to add it modularization using APP_INTERCEPTORS
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {
    }

    @Get('/signed-user')
    @UseGuards(AuthGuard)
    /** 
     * * One way of extracting the data from the session
     */
    // getSignedUser(@Session() session: any) {
    //     return this.usersService.findOne(session.userId || '');
    // }
    /**
     * * Custom decorator for extracting the data from the session
     */
    getSignedUser(@CurrentUser() user: User) {
        return user;
    }


    @Post('signup')
    async signUp(@Body() body: CreateUsersDTO, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password)
        session.userId = user.id;
        return user;
    }

    @Post('sign-in')
    async signIn(@Body() body: CreateUsersDTO, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password)
        session.userId = user.id;
        return user;
    }

    @Post('logout')
    async logOut(@Session() session: any) {
        session.userId = null;
    }

    // @UseInterceptors(ClassSerializerInterceptor) // * Default Serializer Interceptor.

    // * Custom serializer interceptor
    @Get('users/:id')
    findUser(@Param('id') id: string) {
        return this.usersService.findOne(Number(id));
    }

    @Get('users')
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('users/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.removeUser(Number(id))
    }

    @Patch('users/:id')
    updateUserList(@Param('id') id: string, @Body() body: UpdateUserDTO) {
        return this.usersService.update(Number(id), body);
    }
}
