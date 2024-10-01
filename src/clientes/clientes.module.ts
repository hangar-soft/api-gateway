import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CLIENT_SERVICE, envs } from 'src/config';

@Module({
  controllers: [ClientesController],
  providers: [],
  imports: [
    ClientsModule.register([
      { 
        name: CLIENT_SERVICE, 
        transport: Transport.TCP,
        options: {
          host: envs.clientsMicroserviceHost,
          port: envs.clientsMicroservicePort,
        }
      },
    ]),
  ]
})
export class ClientesModule {}
