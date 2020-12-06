import { Request, Response } from 'express';

export class ApiController {
  public endpoint = (_req: Request, res: Response) => {
    res.status(200).json({
      title: 'Card game API',
      status: 'UP',
      timestamp: Date.now(),
    });
  };
}
