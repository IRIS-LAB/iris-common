import { Schema } from 'joi'
import { constraintDecorator } from 'tsdv-joi/core'

/**
 * Decorator to validate a field value with Joi API.
 * @param schema joi schema
 */
export function BusinessValidator(schema: Schema): PropertyDecorator {
  return constraintDecorator([], (originalShema) => {
    return mergeSchemas(schema, originalShema) || originalShema
  })
}

const mergeSchemas = (...schemas: Schema[]): Schema | undefined => {
  let mergedSchema: Schema | undefined
  schemas.forEach(schema => {
    if (schema) {
      // @ts-ignore
      mergedSchema = mergedSchema ? mergedSchema.concat(schema) : schema
    }
  })
  return mergedSchema
}
