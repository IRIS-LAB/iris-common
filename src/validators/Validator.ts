import deepmerge from 'deepmerge'
import { ValidationOptions as JoiValidationOptions } from 'joi'
import { Validator as ValidatorJoi } from 'tsdv-joi'
import { validateJoiResult } from './helpers/validatorHelper'
import { IMessages } from './IMessages'

export interface ValidationOptions {
  messages?: IMessages;
  joiOptions?: JoiValidationOptions
}

/**
 * Business validator
 */
export class Validator {
  private options?: ValidationOptions

  /**
   * Constructor
   * @param options validator options like messages
   */
  constructor(options?: ValidationOptions) {
    this.options = options
  }

  /**
   * Validate a bean decorated with joi decorators. If an error occurs, throw a BusinessException with erreurs field.
   * @param object object to validate
   * @param options options like messages
   */
  public validate<T>(object: T, options ?: ValidationOptions): T {
    return validateJoiResult(
      new ValidatorJoi({
        allowUnknown: true,
        skipFunctions: true,
        stripUnknown: false,
        ...(this.options && this.options.joiOptions ? this.options.joiOptions : {}),
        abortEarly: false
      })
        .validate(object), deepmerge(this.options ? this.options : {}, options || {}).messages)
  }

}
