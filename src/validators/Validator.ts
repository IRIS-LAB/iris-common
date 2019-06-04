import deepmerge from 'deepmerge'
import { Validator as ValidatorJoi } from 'tsdv-joi'
import { validateJoiResult } from './helpers/validatorHelper'
import { IMessages } from './IMessages'

export interface ValidationOptions {
  messages: IMessages
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
    return validateJoiResult(new ValidatorJoi({ abortEarly: false }).validate(object), deepmerge(this.options ? this.options : {}, options || {}).messages)
  }

}
