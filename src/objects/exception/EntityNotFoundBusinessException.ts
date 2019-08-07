import { ErrorDO } from '../do'
import { BusinessException } from './BusinessException'

/**
 * Exception to throw when an entity does not exist for a given identifier.
 */
export class EntityNotFoundBusinessException extends BusinessException {

  constructor(errors: ErrorDO[] | ErrorDO) {
    super(errors)
    Object.setPrototypeOf(this, EntityNotFoundBusinessException.prototype)
  }
}
