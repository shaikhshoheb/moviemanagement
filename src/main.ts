import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { SessionMiddleware } from './middleware/session.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'NestVsNxtJS',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
      },
    }),
  );
  app.use(new SessionMiddleware().use);
  await app.listen(3000);
}
bootstrap();
