// Se definen los datos que el endpoint espera al momento de, en este caso, crear un cliente

import { IsDateString, IsEmail, IsString } from "class-validator";

// Tambien se definen validaciones
export class CreateClienteDto {
  @IsString()
  public dni: string;

  @IsString()
  public first_name: string;

  @IsString()
  public last_name: string;

  @IsString()
  @IsDateString()
  public birthday: string; //YYYY-MM-DD

  @IsString()
  public phone: string;

  @IsEmail()
  public email: string;

  @IsString()
  public genre: string;

  @IsString()
  public country: string;

  @IsString()
  public state: string;
}
