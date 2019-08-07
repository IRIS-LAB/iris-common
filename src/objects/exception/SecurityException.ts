import { ErrorDO } from '../do'
import { IrisException } from './IrisException'

/**
 * Exception to throw for security problems.
 */
export class SecurityException extends IrisException {
  constructor(errors: ErrorDO[] | ErrorDO) {
    super(errors)
    Object.setPrototypeOf(this, SecurityException.prototype)
  }
}
