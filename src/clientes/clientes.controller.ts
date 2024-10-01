import { Controller, Delete, Get, Param, Post, Patch, Inject, Query, Body } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CLIENT_SERVICE } from 'src/config';
import { PaginationDto } from 'src/common';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clients')
export class ClientesController {
  constructor(
    @Inject(CLIENT_SERVICE) private readonly apiGateway: ClientProxy
  ) {}

  @Post()
  create(@Body() createClient: CreateClienteDto) {
    return this.apiGateway.send({ cmd: 'createClient' }, createClient);
  }

  @Get()
  findAll(@Query() PaginationDto: PaginationDto) {
    return this.apiGateway.send({ cmd: 'findAllClient' }, PaginationDto);
  }

  @Get(':dni')
  async findOne(@Param() dni: string) {
    try {
      const cliente = await firstValueFrom(
        this.apiGateway.send({ cmd: 'findOneClient' }, dni)
      );
      
      return cliente;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':dni')
  remove(@Param('dni') dni: string) {
    return this.apiGateway.send({ cmd: 'deleteClient' }, { dni })
    .pipe(
      catchError(error => { throw new RpcException(error) })
    );
  }

  @Patch(':dni')
  update(@Param('dni') dni: string, @Body() UpdateClienteDto: UpdateClienteDto) {
    return this.apiGateway.send({ cmd: 'updateClient' }, {
      dni,
      ...UpdateClienteDto
    }).pipe(
      catchError(error => { throw new RpcException(error) })
    );
  }
}
