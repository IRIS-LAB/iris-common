import { ErrorDO } from '../do'
import { BusinessException } from './BusinessException'

export class EntityNotFoundBusinessException extends BusinessException {

  constructor(errors: ErrorDO[] | ErrorDO) {
    super(errors)
    Object.setPrototypeOf(this, EntityNotFoundBusinessException.prototype)
  }
}
