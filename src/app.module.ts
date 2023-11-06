import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Reports } from './reports/reports.entitiy';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // we don't want to to reimport the configuration in other modules
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    MessagesModule, UsersModule, ReportsModule,
    // * Casual way of setting up the default ORM database.
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [
    //     User,
    //     Reports
    //   ],
    //   synchronize: true,
    // })],

    // * Nest approach to set up the data base with the configuration service DI injection and env file reader.
    TypeOrmModule.forRootAsync(
      {
        inject: [ConfigService], // inject the config service
        useFactory: (config: ConfigService) => {
          return {
            type: 'sqlite',
            database: config.get('DB_NAME'),
            entities: [
              User,
              Reports
            ],
            synchronize: true,
          }
        }
      }
    )],
  controllers: [AppController],
  providers: [AppService,
    // * Here we have registered a global pipe inside our APP module. This helps to continue the End to End user testing.
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true
      })
    }],
})
export class AppModule {
  // * Here in this function we need to set up some middleware that needs to be run every time the application execute a request.
  // Todo: A global scope middleware that would apply to the every request should be passed through the application routes.
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession(
      {
        keys: ['cookie-session']
      }
    )).forRoutes('*')
  }
}
