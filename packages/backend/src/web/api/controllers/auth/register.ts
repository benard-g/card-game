import Joi from '@hapi/joi';

import { UserAlreadyExistsError } from '../../../../constants/errors/UserAlreadyExistsError';
import { Core } from '../../../../core';
import { Logger } from '../../../../utils/Logger';

import { createAsyncController } from '../../utils/Controller';
import { validateRequestBody } from '../../utils/RequestBody';

const LOGGER_PREFIX = '[web][controllers][auth_register]';

interface RequestBody {
  pseudo: string;
  password: string;
}

const schema = Joi.object<RequestBody>({
  pseudo: Joi.string().min(2).max(24).required(),
  password: Joi.string().min(8).required(),
});

export function register(core: Core, logger: Logger) {
  return createAsyncController(async (req, res) => {
    const validation = validateRequestBody(schema, req.body);
    if (!validation.isOk) {
      res.status(400).json(validation.error);
      return;
    }

    try {
      const createdUser = await core.user.createUser(validation.body);

      logger.info(`${LOGGER_PREFIX} user created`, {
        pseudo: createdUser.pseudo,
      });
      res.status(201).send('User created');
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        logger.info(`${LOGGER_PREFIX} user already exists`, {
          pseudo: validation.body.pseudo,
        });
        res.status(409).send('User already exists');
        return;
      }

      throw error;
    }
  });
}
