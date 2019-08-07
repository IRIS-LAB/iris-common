import { ErrorDO } from '../do'
import { IrisException } from './IrisException'

/**
 * Exception to throw for business error.
 */
export class BusinessException extends IrisException {
  constructor(errors: ErrorDO[] | ErrorDO) {
    super(errors)
    Object.setPrototypeOf(this, BusinessException.prototype)
  }
}
