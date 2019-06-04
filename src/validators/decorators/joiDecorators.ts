import { Schema } from 'joi'
import { constraintDecorator } from 'tsdv-joi/core'

/**
 * Decorator to validate a field value with Joi API.
 * @param schema joi schema
 */
export function BusinessValidator(schema: Schema): PropertyDecorator {
  return constraintDecorator([], () => {
    return schema
  })
}
