import { Request, Response } from 'express';

export function heartbeat(_req: Request, res: Response): void {
  res.status(200).send({
    name: 'Card-Game API',
    heartbeat: Date.now(),
  });
}
