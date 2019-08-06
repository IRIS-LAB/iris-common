import deepmerge from 'deepmerge'
import { Validator } from 'tsdv-joi'
import { ValidationResult } from 'tsdv-joi/ValidationResult'
import { BusinessValidatorOptions, Messages } from '../../interfaces'
import { BusinessException, ErrorDO } from '../../objects/exception'

/**
 * Business validator
 */
export class BusinessValidatorService {
  private options?: BusinessValidatorOptions

  /**
   * Constructor
   * @param options validator options like messages
   */
  constructor(options?: BusinessValidatorOptions) {
    this.options = options
  }

  /**
   * Validate a bean decorated with joi decorators. If an error occurs, throw a BusinessException with errors field.
   * @param object object to validate
   * @param options options like messages
   */
  public validate<T>(object: T, options ?: BusinessValidatorOptions): T {
    return this.validateJoiResult(
      new Validator({
        allowUnknown: true,
        skipFunctions: true,
        stripUnknown: false,
        ...(this.options && this.options.joiOptions ? this.options.joiOptions : {}),
        abortEarly: false
      })
        .validate(object), deepmerge(this.options ? this.options : {}, options || {}).messages)
  }

  /**
   * Check the validation result and throw BusinessException with field errors if the validation fails.
   * @param result the valid object
   * @param messages messages object
   */
  private validateJoiResult<T>(result: ValidationResult<T>, messages?: Messages | null): T {
    if (result.error) {
      const errors = result.error.details.map(({ message, context, type, path }) => {
        if (!context || !context.key) {
          return
        }
        const field = context.key
        return new ErrorDO(field, type, this.getMessage(field, type, context, message, messages), {
          value: context.value,
          limit: context.limit,
          path: Array.isArray(path) ? path.join('.') : path
        })
      }).filter(e => e !== undefined && e !== null) as ErrorDO[]
      throw new BusinessException(errors)
    }
    return result.value
  }

  private getMessage(field: string, type: string, context: any, message: string, messages?: Messages | null): string {
    if (messages) {
      let found = false
      const splittedType = type.split('.')
      let data: any = messages
      for (const part of splittedType) {
        if (data.hasOwnProperty(part)) {
          data = data[part]
          if (typeof data === 'string') {
            found = true
            break
          }
        } else {
          break
        }
      }
      if (found && data) {
        let result = data.toString()
        for (const key in context) {
          result = result.replace('$field', context.key)
          if (context.hasOwnProperty(key)) {
            result = result.replace('$' + key, context[key])
          }
        }
        return result
      }
    }
    return message
  }
}
