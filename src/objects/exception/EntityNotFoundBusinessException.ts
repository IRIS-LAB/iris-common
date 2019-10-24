import { ErrorDO } from '../do'
import { BusinessException } from './BusinessException'

/**
 * Exception to throw when an entity does not exist for a given identifier.
 */
export class EntityNotFoundBusinessException extends BusinessException {

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
