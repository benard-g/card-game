export interface IService {
  start(): Promise<boolean>;
  stop(): Promise<boolean>;
}
