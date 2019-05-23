import { Validator } from 'tsdv-joi'
import { validateJoiResult } from '~/validators/helpers/validatorHelper'

/**
 * Validate an object with the Joi model
 * @param {*} model joi
 * @param {*} object to validate
 * @return a valid object
 */
export function checkByDecorator<T>(object: T): T {
    return validateJoiResult(new Validator({abortEarly: false}).validate(object))
}
