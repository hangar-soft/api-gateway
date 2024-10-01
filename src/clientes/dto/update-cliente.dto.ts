import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';

// PartialType: Hace todas las propiedades de CreateClientDto opcionales
export class UpdateClienteDto extends PartialType(CreateClienteDto) {}
