import Joi from '@hapi/joi';

type ValidateBodyResult<T> =
  | { isOk: true; body: T }
  | { isOk: false; error: Joi.ValidationError };

export function validateRequestBody<T>(
  schema: Joi.ObjectSchema<T>,
  requestBody: any,
): ValidateBodyResult<T> {
  const result = schema.validate(requestBody, { abortEarly: false });
  if (result.error) {
    return { isOk: false, error: result.error };
  }

  return { isOk: true, body: requestBody as T };
}
