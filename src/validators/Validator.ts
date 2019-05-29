import deepmerge from 'deepmerge'
import { Validator as ValidatorJoi } from 'tsdv-joi'
import { validateJoiResult } from './helpers/validatorHelper'
import { IMessages } from './IMessages'

export interface ValidationOptions {
    messages: IMessages
}

export class Validator {
    private options?: ValidationOptions

    constructor(options?: ValidationOptions) {
        this.options = options
    }

    public validate<T>(object: T, options ?: ValidationOptions): T {
        return validateJoiResult(new ValidatorJoi({abortEarly: false}).validate(object), deepmerge(this.options ? this.options : {}, options || {}).messages)
    }

}
