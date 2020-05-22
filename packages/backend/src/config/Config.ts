import { load as loadServer, ServerConfig } from './ServerConfig';
import { load as loadServices, ServicesConfig } from './ServicesConfig';

export interface Config {
  server: ServerConfig;
  services: ServicesConfig;
}

export function load(): Config {
  return {
    server: loadServer(),
    services: loadServices(),
  };
}
