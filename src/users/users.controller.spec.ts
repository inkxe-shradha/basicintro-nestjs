import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
    let controller: UsersController;
    let fakeUserService: Partial<UsersService>;
    let fakeAuthService: Partial<AuthService>;

    beforeEach(async () => {
        fakeUserService = {
            findOne: (id: number) => {
                return Promise.resolve({
                    id,
                    email: 'test@example.com',
                    password: 'test',
                } as User);
            },
            find: (email: string) => {
                return Promise.resolve([
                    { id: 12, email, password: 'test' } as User,
                ]);
            },
            removeUser: (id: number) =>
                Promise.resolve({
                    id,
                    email: 'test@gmail.com',
                    password: 'test',
                } as User),
            // update: (id: string, ) => {},
            // createUser: () => {},
        };
        fakeAuthService = {
            signin: (email: string, password: string) => {
                return Promise.resolve({
                    id: 12,
                    email: email,
                    password: password,
                } as User);
            },
            // signup: () => {},
        };
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: fakeUserService,
                },
                {
                    provide: AuthService,
                    useValue: fakeAuthService,
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('Find all users and return list of given users', async () => {
        const user = await controller.findAllUsers('test@example.com');
        expect(user[0].email).toEqual('test@example.com');
    });

    it('Find only one user and return list of given users', async () => {
        const user = await controller.findUser('12');
        expect(user.email).toEqual(user.email);
    });

    it('Find user throws error if user does not exist', async () => {
        fakeUserService.findOne = () => null;
        await expect(controller.findUser('')).rejects.toThrow(
            NotFoundException,
        );
    });

    it('Should able to sign in updates the session object and return list of users', async () => {
        const session = {
            userId: -1,
        };
        const user = await controller.signIn(
            { email: 'test@example.com', password: 'test' },
            session,
        );
        expect(user.id).toEqual(12);
        expect(session.userId).toEqual(12);
    });
});
