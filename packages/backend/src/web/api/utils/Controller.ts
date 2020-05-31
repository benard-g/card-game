import { Request, Response } from 'express';
import ExpressAsyncHandler from 'express-async-handler';

export type Controller = (req: Request, res: Response) => void;

export type AsyncController = (req: Request, res: Response) => Promise<void>;

export function createAsyncController(controller: AsyncController) {
  return ExpressAsyncHandler(controller);
}
