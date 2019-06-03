import { Validator } from 'tsdv-joi'
import { validateJoiResult } from './validatorHelper'

/**
 * Validate an object with the Joi model by decorators
 * @param {*} model joi
 * @param {*} object to validate
 * @return a valid object
 */
export function checkByDecorator<T>(object: T): T {
  return validateJoiResult(new Validator({ abortEarly: false }).validate(object))
}
