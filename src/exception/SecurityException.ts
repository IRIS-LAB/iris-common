import { ErreurDO } from '../do'
import { IrisException } from './IrisException'

export class SecurityException extends IrisException {
  constructor(errors: ErreurDO[]) {
    super(errors)
    Object.setPrototypeOf(this, SecurityException.prototype)
  }
}
