import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { SessionMiddleware } from './middleware/session.middleware';
import { swaggerConfig } from './swagger.config';

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
  swaggerConfig(app);
  app.use(new SessionMiddleware().use);
  await app.listen(3000);
}
bootstrap();
