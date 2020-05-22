import { load as loadServices, ServicesConfig } from './ServicesConfig';

export interface Config {
  services: ServicesConfig;
}

export function load(): Config {
  return {
    services: loadServices(),
  };
}
