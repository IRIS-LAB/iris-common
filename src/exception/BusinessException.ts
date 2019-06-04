import { ErreurDO } from '../do'
import { IrisException } from './IrisException'

export class BusinessException extends IrisException {
  constructor(errors: ErreurDO[] | ErreurDO) {
    super(errors)
    Object.setPrototypeOf(this, BusinessException.prototype)
  }
}
