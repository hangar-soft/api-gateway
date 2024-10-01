import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  CLIENTS_MICROSERVICE_HOST: string,
  CLIENTS_MICROSERVICE_PORT: number
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  CLIENTS_MICROSERVICE_HOST: joi.string().required(),
  CLIENTS_MICROSERVICE_PORT: joi.number().required()
})
.unknown(true);

const { error, value } = envsSchema.validate( process.env );

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  clientsMicroserviceHost: envVars.CLIENTS_MICROSERVICE_HOST,
  clientsMicroservicePort: envVars.CLIENTS_MICROSERVICE_PORT
}