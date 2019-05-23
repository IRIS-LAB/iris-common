import { Schema } from 'joi'
import { constraintDecorator } from 'tsdv-joi/core'

/**
 * Decorator to validate champErreur with Joi API.
 * @param schema joi schema
 */
export function BusinessValidator(schema: Schema): PropertyDecorator {
    return constraintDecorator([], () => {
        return schema
    })
}
