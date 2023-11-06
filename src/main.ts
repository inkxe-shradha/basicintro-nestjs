import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global pipe configuration for the validation pipe and cookie sessions ( Comment it out for now because of the End to end testing configuration. This has been now configured in the App.controller.ts file)
  // app.useGlobalPipes(
  //   new ValidationPipe(
  //     {
  //       whitelist: true
  //     }
  //   )
  // );


  await app.listen(3000);
}
bootstrap();
