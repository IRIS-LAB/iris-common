import { validate } from 'joi'
import { BusinessException } from '../exception/BusinessException'
import { ErreurDO } from '../objects/ErreurDO'

/**
 * Validate an object with the Joi model
 * @param {*} model joi
 * @param {*} object to validate
 * @return a valid object
 */
export const check = (model, object) => {
  const { error, value } = validate(object, model, { abortEarly: false })
  if (error) {
    const errors = error.details.map(({ message, context, type }) => {
      const field = context.key
      return new ErreurDO(field, `${field}.${type}`, message)
    })
    throw new BusinessException(errors)
  }
  return value
}
