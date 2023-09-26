import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    let fakeUserService: Partial<UsersService>;

    beforeEach(async () => {
        const user: User[] = [];
        fakeUserService = {
            find: (email: string) => {
                const filterUsers = user.filter((user) => user.email === email);
                return Promise.resolve(filterUsers);
            },
            createUser: (email: string, password: string) => {
                const userData = {
                    id: Math.floor(Math.random() * 9999),
                    email,
                    password,
                } as User;
                user.push(userData);
                return Promise.resolve(userData);
            },
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', async () => {
        expect(service).toBeDefined();
    });

    it('Should able to sign up with a salted and hash password', async () => {
        const user = await service.signup(
            'shradha.praharaj@gmail.com',
            'Sh9#923892',
        );
        expect(user.password).not.toEqual('Sh9#923892');
        const [salt] = user.password.split('.');
        expect(salt).toBeDefined();
    });

    it('Should be able to throws an error if user sign in the email address is exit', async () => {
        await service.signup('asdf@asdf.com', 'asdf');
        await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
            BadRequestException,
        );
    });

    it('Should be able to login with the valid email address', async () => {
        await service.signup('asdf@asdf.com', 'password');
        const user = await service.signin('asdf@asdf.com', 'password');
        expect(user).toBeDefined();
    });

    it('Should throw an error if the user have invalid email address', async () => {
        await expect(service.signin('asdf@asdf.com', 'abc')).rejects.toThrow(
            NotFoundException,
        );
    });

    it('Should throw an error if the user have invalid password', async () => {
        await service.signup('asdf@asdf.com', 'password');
        await expect(service.signin('asdf@asdf.com', 'abc')).rejects.toThrow(
            NotFoundException,
        );
    });
});
