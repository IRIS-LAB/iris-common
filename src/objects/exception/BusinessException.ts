import { ErrorDO } from '../do'
import { IrisException } from './IrisException'

export class BusinessException extends IrisException {
  constructor(errors: ErrorDO[] | ErrorDO) {
    super(errors)
    Object.setPrototypeOf(this, BusinessException.prototype)
  }
}
