import { ErrorDO } from '../do'
import { IrisException } from './IrisException'

/**
 * Exception to throw for business error.
 */
export class BusinessException extends IrisException {
  constructor(errors: ErrorDO[] | ErrorDO) {
    super(errors)

    // restore prototype chain
    const actualProto = new.target.prototype

    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto)
    } else {
      // @ts-ignore
      this.__proto__ = actualProto
    }
  }
}
