import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('It handel the sign up requests', async () => {
        const email = 'chingudisuman223s@gmail.com';
        const res = await request(app.getHttpServer())
            .post('/auth/signup')
            .send({
                email,
                password: 'password'
            })
            .expect(201);
        const { email: email_1, id } = res.body;
        expect(id).toBeDefined();
        expect(email_1).toEqual(email_1);
    });

    it('Sign up the new user that currently login in user-1', async () => {
        const email = 'chingudisuman213s@gmail.com';
        const res = await request(app.getHttpServer())
            .post('/auth/signup')
            .send({
                email,
                password: 'password'
            }).expect(201);

        const cookie = res.get('Set-Cookie');
        const { body } = await request(app.getHttpServer())
            .get('/auth/signed-user')
            .set('Cookie', cookie)
            .expect(200);

        expect(body.id).toBeDefined();
        expect(body.email).toEqual(email);
    })
});
