// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'; // Asegúrate de que esto esté antes de usar process.env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:5000', // Permite solicitudes solo desde tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Permite el envío de cookies de credenciales (si las usas)
  });

  // Multer should be configured in AppModule, not as a global interceptor
  // (Nota: Tu comentario original sobre Multer es correcto, no se configura aquí globalmente)

  await app.listen(process.env.PORT || 3000);
}
bootstrap();





