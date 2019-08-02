import { ErrorDO } from '../do'
import { IrisException } from './IrisException'

export class SecurityException extends IrisException {
  constructor(errors: ErrorDO[] | ErrorDO) {
    super(errors)
    Object.setPrototypeOf(this, SecurityException.prototype)
  }
}
