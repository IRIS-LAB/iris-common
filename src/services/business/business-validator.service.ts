import deepmerge from 'deepmerge'
import { Validator } from 'tsdv-joi'
import { ValidationResult } from 'tsdv-joi/ValidationResult'
import { BusinessValidatorOptions, Messages } from '../../interfaces'
import { BusinessException, ErrorDO } from '../../objects/exception'

/**
 * BusinessValidatorService used to validate a bean with @BusinessValidator() decorator on its fields.
 *
 * Use @Nested() to validate a field that should be validated itself.
 * Use @NestedArray() to validate a field of type Array that each item should be validated themselves.
 */
export class BusinessValidatorService {

  /**
   * Return a message by a code.
   * @param field - the field that will replace the keyword '$ field' in the message
   * @param code - the error code
   * @param context - the joi validation context of the error
   * @param message - the default message if no message in found in messages
   * @param messages - the set of messages
   */
  private static getMessage(field: string, code: string, context: any, message: string, messages?: Messages | null): string {
    if (messages) {
      let found = false
      const splittedType = code.split('.')
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
  private options?: BusinessValidatorOptions

  /**
   * Constructor
   * @param options- validator options with messages and/or joiOptions overridden.
   */
  constructor(options?: BusinessValidatorOptions) {
    this.options = options
  }

  /**
   * Validate a bean decorated with joi decorators. If an error occurs, BusinessException with errors field will be thrown.
   * @param object - object to validate
   * @param options - validator options with messages and/or joiOptions overridden.
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
   * Check the validation result and throw a BusinessException with field errors if the validation fails.
   * @param result - the validation result object
   * @param messages - the messages object
   */
  private validateJoiResult<T>(result: ValidationResult<T>, messages?: Messages | null): T {
    if (result.error) {
      const errors = result.error.details.map(({ message, context, type, path }) => {
        if (!context || !context.key) {
          return
        }
        const field = context.key
        return new ErrorDO(field, type, BusinessValidatorService.getMessage(field, type, context, message, messages), {
          value: context.value,
          limit: context.limit,
          path: (path as unknown) as Array<string|number>
        })
      }).filter(e => e !== undefined && e !== null) as ErrorDO[]
      throw new BusinessException(errors)
    }
    return result.value
  }
}
