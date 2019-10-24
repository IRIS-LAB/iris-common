import { ErrorDO } from '../do'
import { BusinessException } from './BusinessException'

const TYPE = 'iris-common:EntityNotFoundBusinessException'

/**
 * Exception to throw when an entity does not exist for a given identifier.
 */
export class EntityNotFoundBusinessException extends BusinessException {

  public static isA(o: any): boolean {
    return o && o._type && o._type === TYPE
  }

  constructor(errors: ErrorDO[] | ErrorDO) {
    super(errors)
    this._type = TYPE

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
