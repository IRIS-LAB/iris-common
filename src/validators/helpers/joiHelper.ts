import { Schema, validate } from 'joi'
import { validateJoiResult } from './validatorHelper'

/**
 * Validate an object with the Joi model
 * @param {*} model joi
 * @param {*} object to validate
 * @return a valid object
 */
// tslint:disable-next-line:ban-types
export function check<T>(model: Schema, object: T): T {
    return validateJoiResult(validate(object, model, {abortEarly: false}))
}
