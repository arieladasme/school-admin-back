import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // Habilito cors para aceptar solicitudes
  app.enableCors()

  const logger = new Logger('Bootstrap')

  // Agrego prefijo global para todas las rutas
  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  await app.listen(process.env.PORT)
  logger.log(`Run in port ${process.env.PORT}`)
}
bootstrap()
