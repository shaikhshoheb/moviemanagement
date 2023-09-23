import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app) => {
  const config = new DocumentBuilder()
    .setTitle('Movie Management API')
    .setDescription('Assignment Movies,Actors, Login API')
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Movies')
    .addTag('Actors')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
};
