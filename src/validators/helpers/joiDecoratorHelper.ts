import { ValidationOptions } from 'joi'
import { Validator } from 'tsdv-joi'
import { validateJoiResult } from './validatorHelper'

/**
 * Validate an object with the Joi model by decorators
 * @param {*} object to validate
 * @param o joi validation options
 * @return a valid object
 */
export function checkByDecorator<T>(object: T, o?: ValidationOptions): T {
  return validateJoiResult(new Validator({ ...(o || {}), abortEarly: false }).validate(object))
}
