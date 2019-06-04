import { ErreurDO } from '../do'
import { BusinessException } from './BusinessException'

export class EntityNotFoundBusinessException extends BusinessException {

  constructor(errors: ErreurDO[] | ErreurDO) {
    super(errors)
    Object.setPrototypeOf(this, EntityNotFoundBusinessException.prototype)
  }
}
